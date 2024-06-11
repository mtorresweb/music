import { StatusBar } from "expo-status-bar";
import {
	StyleSheet,
	Text,
	View,
	Pressable,
	Image,
	ToastAndroid,
} from "react-native";
import defaultSong from "../assets/defaultSong.jpg";
import happy from "../assets/songs/happy.png";
import allofme from "../assets/songs/allofme.jpeg";
import allOfMeSong from "../assets/songs//AllOfMe.mp3";
import happySong from "../assets/songs/Happy.mp3";
import espinoza from "../assets/songs/espinoza.png";
import espinozaSong from "../assets/songs/espinoza.mp3";
import karolg from "../assets/songs/karolg.png";
import karolgSong from "../assets/songs/karolg.mp3";
import diomedez from "../assets/songs/diomedez.png";
import diomedezSong from "../assets/songs/diomedez.mp3";
import efecto from "../assets/songs/efecto.jpg";
import efectoSong from "../assets/songs/efecto.mp3";
import sech from "../assets/songs/sech.jpeg";
import sechSong from "../assets/songs/sech.mp3";
import domingo from "../assets/songs/domingo.jpeg";
import domingoSong from "../assets/songs/domingo.mp3";
import { useRef, useState, useEffect } from "react";
import { Audio } from "expo-av";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

const DEFAULT_IMAGE = Image.resolveAssetSource(defaultSong).uri;

const songs = [
	{
		tittle: "All Of Me",
		song: allOfMeSong,
		image: Image.resolveAssetSource(allofme).uri,
	},
	{
		tittle: "Happy",
		song: happySong,
		image: Image.resolveAssetSource(happy).uri,
	},
	{
		tittle: "Karol G",
		song: karolgSong,
		image: Image.resolveAssetSource(karolg).uri,
	},
	{
		tittle: "Soltero",
		song: espinozaSong,
		image: Image.resolveAssetSource(espinoza).uri,
	},
	{
		tittle: "Yo soy mundial",
		song: diomedezSong,
		image: Image.resolveAssetSource(diomedez).uri,
	},
	{
		tittle: "Un Domingo",
		song: domingoSong,
		image: Image.resolveAssetSource(domingo).uri,
	},
	{
		tittle: "Efecto",
		song: efectoSong,
		image: Image.resolveAssetSource(efecto).uri,
	},
	{
		tittle: "Que mas pues",
		song: sechSong,
		image: Image.resolveAssetSource(sech).uri,
	},
];

let songNumber = 0;

export default function Home({ setPage }) {
	const [image, setImage] = useState(songs[songNumber]?.image || DEFAULT_IMAGE);
	const [isPlaying, setIsPlaying] = useState(false);
	const [isLoop, setIsLoop] = useState(false);
	const currentSound = useRef(null);

	const playSound = async () => {
		try {
			if (!currentSound?.current) {
				const { sound } = await Audio.Sound.createAsync(songs[songNumber].song);
				currentSound.current = sound;
				setImage(songs[songNumber].image);
				setIsPlaying(true);

				await currentSound.playAsync();
				return;
			}
		} catch (error) {}

		try {
			const result = await currentSound.current.getStatusAsync();
			if (result.isLoaded) {
				if (result.isPlaying === false) {
					currentSound.current.playAsync();
					setIsPlaying(true);
				}
			}
		} catch (error) {}
	};

	const stopSound = async () => {
		try {
			const result = await currentSound.current.getStatusAsync();
			if (result.isLoaded) {
				if (result.isPlaying === true) {
					currentSound.current.pauseAsync();
					setIsPlaying(false);
				}
			}
		} catch (error) {}
	};

	const loopSound = async () => {
		try {
			const result = await currentSound.current.getStatusAsync();
			if (result.isLoaded) {
				if (result.isLooping === false) {
					currentSound.current.setIsLoopingAsync(true);
					setIsLoop(true);
				} else {
					currentSound.current.setIsLoopingAsync(false);
					setIsLoop(false);
				}
			}
		} catch (error) {}
	};

	const nextSong = async () => {
		try {
			if (songNumber === songs.length - 1) {
				ToastAndroid.show("Esta es la ultima cancion", ToastAndroid.SHORT);
			} else {
				if (currentSound.current) {
					await stopSound();
					currentSound.current.setIsLoopingAsync(false);
					setIsLoop(false);
					await currentSound.current.unloadAsync();
				}
				songNumber += 1;
				currentSound.current = null;
				await playSound();
			}
		} catch (error) {}
	};

	const previousSong = async () => {
		try {
			if (songNumber === 0) {
				ToastAndroid.show("Esta es la primera cancion", ToastAndroid.SHORT);
			} else {
				await stopSound();
				currentSound.current.setIsLoopingAsync(false);
				setIsLoop(false);
				await currentSound.current.unloadAsync();
				songNumber -= 1;
				currentSound.current = null;
				await playSound();
			}
		} catch (error) {}
	};

	const navigate = async () => {
		await stopSound();
		currentSound.current.setIsLoopingAsync(false);
		setIsLoop(false);
		await currentSound.current.unloadAsync();
		currentSound.current = null;
		setPage(2);
	};

	return (
		<View style={styles.container}>
			<Pressable onPress={navigate} style={styles.about}>
				<Text>About</Text>
			</Pressable>
			<View style={styles.Home}>
				<Image
					style={styles.image}
					source={{ uri: image }}
					width={299}
					height={299}
				/>
				<Text style={styles.title}>{songs[songNumber].tittle}</Text>
				<View style={styles.controls}>
					<Pressable onPress={previousSong}>
						<AntDesign name="stepbackward" size={24} color="black" />
					</Pressable>
					{isPlaying ? (
						<Pressable onPress={stopSound}>
							<AntDesign name="pause" size={24} color="black" />
						</Pressable>
					) : (
						<Pressable onPress={playSound}>
							<AntDesign name="caretright" size={24} color="black" />
						</Pressable>
					)}

					<Pressable onPress={loopSound}>
						{isLoop ? (
							<Entypo name="loop" size={24} color="blue" />
						) : (
							<Entypo name="loop" size={24} color="black" />
						)}
					</Pressable>

					<Pressable onPress={stopSound}>
						<Entypo name="controller-stop" size={24} color="black" />
					</Pressable>

					<Pressable onPress={nextSong}>
						<AntDesign name="stepforward" size={24} color="black" />
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
	controls: {
		flexDirection: "row",
		justifyContent: "space-around",
		marginTop: 20,
		width: 300,
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
		textAlign: "center",
		marginTop: 20,
		color: "black",
	},
});
