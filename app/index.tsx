import { useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [otp, setOTP] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const inputsRef = useRef<(TextInput | null)[]>([]);

=  const handleChange = (text: string, index: number) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
    if (!text && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }

    if (newCode.every((digit) => digit !== "")) {
      submitPassword(newCode.join(""));
    }
  };

  const generateOneTimePassword = () => {
    const newOTP = Math.floor(100000 + Math.random() * 900000).toString();
    setOTP(newOTP);

    Alert.alert(
      "One Time Password",
      `Here is your one time password: ${newOTP}`,
      [
        {
          text: "OK",
          onPress: () => console.log("OTP:", newOTP),
        },
      ],
      { cancelable: true }
    );

    setSuccess(false);
    setCode(["", "", "", "", "", ""]);
    inputsRef.current[0]?.focus();
  };

  const submitPassword = (userSubmittedOTP?: string) => {
    setLoading(true);
    const otpToCheck = userSubmittedOTP || code.join("");

    setTimeout(() => {
      setLoading(false);

      if (otpToCheck === otp) {
        setSuccess(true);
      } else {
        Alert.alert("Incorrect OTP", "Please try again.");
      }
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Enter One Time Password</Text>

      <View style={styles.contentWrapper}>
        {!success ? (
          <View style={styles.inputContainer}>
            {code.map((digit, i) => (
              <TextInput
                autoFocus={i === 0}
                key={i}
                ref={(ref) => (inputsRef.current[i] = ref)}
                style={styles.input}
                value={digit}
                cursorColor="#80808070"
                selectionColor="#80808070"
                onChangeText={(text) =>
                  handleChange(text.replace(/[^0-9]/g, ""), i)
                }
                maxLength={1}
                keyboardType="number-pad"
                textAlign="center"
                autoCorrect={false}
              />
            ))}
          </View>
        ) : (
          <View style={styles.successContainer}>
            <Text style={styles.successText}>
              You have successfully logged in.
            </Text>
          </View>
        )}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => submitPassword()}
          style={styles.primaryButton}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.primaryButtonText}>Submit</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={generateOneTimePassword}
          style={styles.secondaryButton}
        >
          <Text style={styles.secondaryButtonText}>
            Generate One Time Password
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontSize: 28,
    fontWeight: "600",
    paddingVertical: 20,
  },
  contentWrapper: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 60,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    maxWidth: 360,
    height: 60,
  },
  input: {
    height: 48,
    width: 48,
    borderColor: "#80808070",
    borderWidth: 2,
    borderRadius: 4,
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
  },
  successContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 60,
  },
  successText: {
    fontSize: 20,
    fontWeight: "500",
    textAlign: "center",
  },
  buttonContainer: {
    width: "100%",
    position: "absolute",
    bottom: 0,
    flexDirection: "column",
  },
  primaryButton: {
    backgroundColor: "#03008f",
    paddingVertical: 20,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    marginTop: 12,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 4,
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  secondaryButton: {
    paddingVertical: 8,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    marginTop: 8,
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000000",
  },
});
