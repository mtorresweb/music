import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import defaultSong from "../assets/defaultSong.jpg";
import happy from "../assets/songs/happy.png";
import allofme from "../assets/songs/allofme.jpeg";
import allOfMeSong from "../assets/songs//AllOfMe.mp3";
import happySong from "../assets/songs/Happy.mp3";
import { useRef, useState, useEffect } from "react";
import { Audio } from "expo-av";

const DEFAULT_IMAGE = Image.resolveAssetSource(defaultSong).uri;

const songs = [
	{
		tittle: "All Of Me",
		song: allOfMeSong,
		image: Image.resolveAssetSource(allofme).uri,
	},
	{
		tittle: "Happy",
		song: allOfMeSong,
		image: Image.resolveAssetSource(happy).uri,
	},
];

export default function Home({ setPage }) {
	const [image, setImage] = useState(null);
	const [isPlaying, setIsPlaying] = useState(false);
	const [isLoop, setIsLoop] = useState(false);
	const img = useRef(null);
  const [songNumber, setSongNumber] = useState(0)

	const [sound, setSound] = useState(null);

	const playSound = async (song) => {
		const { sound } = await Audio.Sound.createAsync(song);
		setSound(sound);

		await sound.playAsync();
	};

	return (
		<View style={styles.container}>
			<Pressable onPress={() => setPage(2)} style={styles.about}>
				<Text>About</Text>
			</Pressable>
			<View style={styles.Home}>
				<Image
					ref={img}
					style={styles.image}
					source={{ uri: image || DEFAULT_IMAGE }}
					width={299}
					height={299}
				/>
				<View>
					<Pressable onPress={() => playSound("../assets/songs/Happy.mp3")}>
						<Text>h</Text>
					</Pressable>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#fff",
		alignItems: "center",
		flexGrow: 1,
		padding: 50,
	},
	text: {
		color: "black",
	},
	about: {
		alignSelf: "flex-end",
		backgroundColor: "#ccc",
		borderRadius: 10,
		padding: 10,
		marginBottom: 50,
	},
	Home: {},
	image: {
		borderRadius: 20,
	},
});
