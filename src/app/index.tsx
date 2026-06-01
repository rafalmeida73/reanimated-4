import AntDesign from "@expo/vector-icons/AntDesign";
import MaskedView from "@react-native-masked-view/masked-view";
import { useRef, useState } from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";
import Animated, { FadeInDown } from "react-native-reanimated";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function Index() {
  const textInputRef = useRef<TextInput>(null);

  const [isFocused, setIsFocused] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleSend = () => {
    if (isSending) return;

    setIsSending(true);

    setTimeout(() => {
      textInputRef.current?.clear();
      textInputRef.current?.blur();
    }, 600);

    setTimeout(() => {
      textInputRef.current?.clear();
      textInputRef.current?.blur();
      setIsSending(false);
    }, 800);
  };

  return (
    <KeyboardAvoidingView behavior={"padding"} style={styles.content}>
      <View style={styles.container}>
        <MaskedView
          style={styles.maskContainer}
          maskElement={
            <View style={styles.mask}>
              {"Hello, Rafael".split("").map((char, index) => (
                <Animated.Text
                  key={index}
                  style={styles.greeting}
                  entering={FadeInDown.delay(index * 33)
                    .springify()
                    .mass(2)}
                >
                  {char}
                </Animated.Text>
              ))}
            </View>
          }
        >
          <Animated.View
            style={[
              styles.gradient,
              {
                animationName: {
                  to: {
                    transform: [
                      {
                        rotate: "360deg",
                      },
                    ],
                  },
                },
                animationDuration: "3s",
                animationIterationCount: "infinite",
              },
            ]}
          >
            {""}
          </Animated.View>
        </MaskedView>

        <View style={styles.footer}>
          <TextInput
            ref={textInputRef}
            style={styles.input}
            onBlur={() => {
              setIsFocused(false);
            }}
            onFocus={() => {
              setIsFocused(true);
            }}
            placeholder="Type a message"
          />

          <Animated.View
            style={{
              transitionProperty: ["transform", "opacity"],
              transitionDuration: "200ms",
              transform: [
                {
                  scale: isPressed ? 0.8 : 1,
                },
                {
                  translateY: isSending ? -200 : 0,
                },
              ],
              opacity: isSending ? 0 : 1,
            }}
          >
            <AnimatedPressable
              onPressIn={() => {
                setIsPressed(true);
              }}
              onPressOut={() => {
                setIsPressed(false);
              }}
              onPress={() => {
                handleSend();
              }}
              style={[
                styles.sendButton,
                {
                  trasitionPoperty: ["opacity", "marginLeft", "transform"],
                  transitionDuration: "300ms",
                  opacity: isFocused ? 1 : 0,
                  marginLeft: isFocused ? 0 : -50,
                  transform: [
                    {
                      translateX: isFocused ? 0 : 58,
                    },
                  ],
                },
              ]}
            >
              <AntDesign name="arrow-up" size={24} color="white" />
            </AnimatedPressable>
          </Animated.View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  greeting: {
    fontSize: 40,
    textAlign: "center",
    fontWeight: "bold",
  },
  gradient: {
    experimental_backgroundImage:
      "linear-gradient(90deg, rgba(255,0,0,1) 0%, rgba(255,154,0,1) 10%, rgba(208,222,33,1) 20%, rgba(79,220,74,1) 30%, rgba(63,218,216,1) 40%, rgba(47,201,226,1) 50%, rgba(28,127,238,1) 60%, rgba(95,21,242,1) 70%, rgba(186,12,248,1) 80%, rgba(251,7,217,1) 90%, rgba(255,0,0,1) 100%)",
    width: "100%",
    height: "100%",
  },
  mask: {
    backgroundColor: "transparent",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  maskContainer: { flex: 1, flexDirection: "row", height: "100%" },
  sendButton: {
    backgroundColor: "#3b82f6",
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    flex: 1,
    height: 50,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#94a3b8",
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 18,
  },
  footer: {
    position: "absolute",
    bottom: 16,
    width: "100%",
    gap: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    padding: 8,
  },
});
