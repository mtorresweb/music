import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import Home from "./components/home";
import About from "./components/about";

export default function App() {
	const [page, setPage] = useState(1);

	return (
		<View style={styles.container}>
			{page === 1 ? <Home setPage={setPage} /> : <About setPage={setPage} />}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
	},
});
