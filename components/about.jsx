import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function About({ setPage }) {
	return (
		<View style={styles.container}>
			<View>
				<Pressable
					style={{
						backgroundColor: "#ccc",
						borderRadius: 10,
						padding: 10,
						marginBottom: 50,
						width: 45,
					}}
					onPress={() => setPage(1)}
				>
					<AntDesign name="arrowleft" size={24} color="black" />
				</Pressable>
			</View>
			<View>
				<Text style={styles.text}>Welcome to my music app</Text>
				<Text style={styles.text}>Creator: Michael T</Text>
				<Text style={styles.text}>Copyright 2024</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#fff",
		flexDirection: "column",
		justifyContent: "space-between",
		flexGrow: 1,
		paddingTop: 50,
		paddingBottom: 50,
		paddingLeft: 50,
	},
	text: {
		color: "black",
	},
});
