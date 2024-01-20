import { useState } from 'react';
import './App.css';
import Editor from "@monaco-editor/react";
import Navbar from './Navbar';
import Axios from 'axios';
import spinner from './spinner.svg';

function App() {

	// State variable to set users source code
  const [userCode, setUserCode] = useState("Quack. Quack! Quack! Quack? Quack! Quack. Quack! Quack? Quack! Quack! Quack? Quack! Quack. Quack! Quack? Quack!");

	// State variable to set editors default language
	const [userLang, setUserLang] = useState("python");

	// State variable to set editors default theme
	const [userTheme, setUserTheme] = useState("vs-dark");

	// State variable to set editors default font size
	const [fontSize, setFontSize] = useState(20);

	// State variable to set users input
	const [userInput, setUserInput] = useState("");

	// State variable to set users output
	const [userOutput, setUserOutput] = useState("");

	// Loading state variable to show spinner
	// while fetching data
	const [loading, setLoading] = useState(false);

	const options = {
		fontSize: fontSize
	}

	// Function to call the compile endpoint
	function compile() {
		setLoading(true);
		if (userCode === ``) {
			return
		}

		// Post request to compile endpoint
		Axios.post(`http://localhost:8000/run`, {
			code: userCode,
			language: userLang,
			input: userInput
		}).then((res) => {
			setUserOutput(res.data);
		}).then(() => {
			setLoading(false);
		})
	}
	function checkQuackPairs(userCode) {
		// Regex pattern: Looks for 'Quack' followed immediately by a punctuation mark (.,!,?)
		const regex = /Quack[.!?]/g;

		// Extract all occurrences of 'Quack' followed immediately by a punctuation
		const matches = userCode.match(regex);

		// Check if every 'Quack' is followed immediately by a punctuation
		// and the total count of such pairs is half the count of 'Quack' in the string
		const quackCount = (userCode.match(/Quack/g) || []).length;
		console.log("matches", matches);
		console.log("quackCount", quackCount);
		return matches.length == userCode.match(/\S+/g).length &&
			matches.length % 2 === 0;
	}
	function playAudio(src) {
		return new Promise(resolve => {
			let audio = new Audio(src);
			audio.play();
			audio.onended = resolve;
		});
	}

	async function sound() {
		if (checkQuackPairs(userCode)) {
			console.log("Valid Quack pairs");
			const regex = /Quack[.!?]/g;
			const quacks = userCode.match(regex) || [];

			for (const quack of quacks) {
				switch (quack[quack.length - 1]) {
					case '.':
						console.log("Quack");
						await playAudio('/voices/DonaldTrump/Quack_Normal.mp3');
						break;
					case '!':
						console.log("Quack");
						await playAudio('/voices/DonaldTrump/Quack_Exclaim.mp3');
						break;
					case '?':
						console.log("Quack");
						await playAudio('/voices/DonaldTrump/Quack_Question.mp3');
						break;
					default:
						// This should not happen
						break;
				}
			}
		} else {
			console.log("Invalid Quack pairs");
		}
	}




	// Function to clear the output screen
	function clearOutput() {
		setUserOutput("");
	}

	return (
		<div className="App">
			<Navbar
				userLang={userLang} setUserLang={setUserLang}
				userTheme={userTheme} setUserTheme={setUserTheme}
				fontSize={fontSize} setFontSize={setFontSize}
			/>
			<div className="main">
				<div className="left-container">
					<Editor
						options={options}
						height="calc(100vh - 50px)"
						width="100%"
						theme={userTheme}
						language={userLang}
						defaultLanguage="python"
						defaultValue="# Enter your code here"
						onChange={(value) => { setUserCode(value) }}
					/>
					<button className="run-btn" onClick={() => compile()}>
						Run
					</button>
					<button className="sound-btn" onClick={() => sound()}>
						<img src={"/sound.png"} width="35" height="40"/>
					</button>
				</div>
				<div className="right-container">
					<h4>Input:</h4>
					<div className="input-box">
						<textarea id="code-inp" onChange=
							{(e) => setUserInput(e.target.value)}>
						</textarea>
					</div>
					<h4>Output:</h4>
					{loading ? (
						<div className="spinner-box">
							<img src={spinner} alt="Loading..." />
						</div>
					) : (
						<div className="output-box">
							<pre>{userOutput}</pre>
							<button onClick={() => { clearOutput() }}
								className="clear-btn">
								Clear
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default App;
