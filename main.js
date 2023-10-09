// getElement stuff
const Body = document.getElementById('body');
const musicContainer = document.getElementById('music-container');
const mainContainer = document.getElementById('main-container');
const userInput = document.getElementById('input');
const Age = document.getElementById('age');
const Form = document.getElementById('form');
const List = document.getElementById('list');
const submitButton = document.getElementById('submit');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');
const currTime = document.querySelector('#currTime');
const durTime = document.querySelector('#durTime');

// Disable age
userInput.addEventListener("change", (e) => {
	const valueFirst = e.currentTarget.value;
	Age.disabled = false;
	if (valueFirst === "") {
        Age.disabled = true;
    } 
});

// Disable submit
Age.addEventListener("keyup", (e) => {
	const valueSecond = e.currentTarget.value;
	submitButton.disabled = false;
	if (valueSecond === "") {
        submitButton.disabled = true;
    } 
});

// Submit listen
Form.addEventListener('submit', e => {
    e.preventDefault();
    execute();
});

// Show player
function showMusic() {
	musicContainer.classList.add("open-music-container")
	Form.classList.add("close-form")
	mainContainer.classList.add("close-main-container")
	List.classList.add("open-list")
}

// Day night detector for background
const hours = new Date().getHours()
	const isDayTime = hours > 6 && hours < 17;
	let time = callTime()
	function callTime() {
		if(isDayTime === true){
			return ('day');
	    } 
	  	else {
			Body.classList.add("night")
		  	return ('night');
	  	}
	}

// MAIN
function execute() {

	// Day night detector for main
	const hours = new Date().getHours()
	const isDayTime = hours > 6 && hours < 12;
	let time = callTime()
	function callTime() {
		if(isDayTime === true){
			return ('day');
	    } 
	  	else {
		  	return ('night');
	  	}
	}

	const userInput = document.getElementById('input').value;

	// Start song
	let songIndex = 0;

	// Songs list
	let notYetSongs = callSongs();
	function callSongs() {
		if (userInput == 'cangco' && time == 'day') {
			return [
					'How Deep Is Your Love - Coffee Jazz Melody',
					'Dream Like Big Band - Coffee Jazz Melody',
					]
		} 
		else if (userInput == 'cangco' && time == 'night') {
			const AgeNumber = document.getElementById('age').value;
			if (AgeNumber < 30) {
				return [
					'David Kushner - Daylight by Stephcynie',
					'Harry Styles - As It Was by Will Gittens',
					'Maroon 5 - Memories by Bobby Brinker',
					'Miley Cyrus - Flower by John Tucker',
					'Olivia Rodrigo - drivers license by Sela Bruce',
					'Photograph - Ed Sheeran by Bea Miller',
					'Someone You Loved - Lewis Capaldi by Boyce Avenue'
					]
			}
			else {
				return [
					'Debussy - Clair de Lune',
					'Ludovico Einaudi - Divenire',
					'Chopin - Prelude B Minor',
					'Yann Tiersen - Comptine dun autre été Amélie',
					'Beethoven - Fur Elise',
				]
			}
		}
		else if (userInput == 'tramcam' && time == 'day') {
			return [
					'How Deep Is Your Love - Coffee Jazz Melody',
					'Dream Like Big Band - Coffee Jazz Melody',
					]
		}
		else if (userInput == 'tramcam' && time == 'night') {
			const AgeNumber = document.getElementById('age').value;
			if (AgeNumber < 30) {
				return [
					'Egg Rollz - baegel, Jobii',
					'Late Flight - SPMato',
					'Maca - Breakfast For Brunch',
					'maskros - bomull',
					'Whos Driving - Galvanice'
					]
			}
			else {
				return [
					'Debussy - Clair de Lune',
					'Ludovico Einaudi - Divenire',
					'Chopin - Prelude B Minor',
					'Yann Tiersen - Comptine dun autre été Amélie',
					'Beethoven - Fur Elise',
				]
			}
		}
		else if (userInput == 'huyetap') {
			return [
				'Frank Sinatra, Count Basie - Fly Me To The Moon',
				'Nico Cartosio - Girl On An Iceberg',
				'Chet Baker - I Fall In Love Too Easily',
				'Billie Holiday - Solitude',
				'Art Farmer - Goodbye, Old Girl'
			]
		}
		else {
			return ['spanish']
		}
	}

	// Choose random
	var shuffled = notYetSongs.sort(function(){return .5 - Math.random()});
	var songs = shuffled.slice(0,5);
	
	// Playlist
	let data = songs
        let list = document.getElementById("song-list");
        for (i = 0; i < data.length; ++i) {
            let li = document.createElement('li');
            li.innerText = data[i];
            list.appendChild(li);
        }

	// Load songs
	loadSong(songs[songIndex]);

	// Update song details
	function loadSong(song) {
		title.innerText = song;
		cover.src = `images/${song}.jpg`;
		audio.src = `music/${song}.mp3`;
	}


	// Play song
	function playSong() {
		musicContainer.classList.add('play');
		playBtn.querySelector('i.fas').classList.remove('fa-play');
		playBtn.querySelector('i.fas').classList.add('fa-pause');
		audio.play();
	}

	// Pause song
	function pauseSong() {
		musicContainer.classList.remove('play');
		playBtn.querySelector('i.fas').classList.add('fa-play');
		playBtn.querySelector('i.fas').classList.remove('fa-pause');
		audio.pause();
 	}
  
	// Previous song
  	function prevSong() {
		songIndex--;
		if (songIndex < 0) {
	  		songIndex = songs.length - 1;
		}
		loadSong(songs[songIndex]);
  		playSong();
    }
  
  	// Next song
  	function nextSong() {
		songIndex++;
		if (songIndex > songs.length - 1) {
	  		songIndex = 0;
		}
  		loadSong(songs[songIndex]);
		playSong();
 	}

	// Update progress bar
	function updateProgress(e) {
		const { duration, currentTime } = e.srcElement;
		const progressPercent = (currentTime / duration) * 100;
		progress.style.width = `${progressPercent}%`;
 	}
  
  	// Set progress bar
  	function setProgress(e) {
		const width = this.clientWidth;
		const clickX = e.offsetX;
		const duration = audio.duration;
		audio.currentTime = (clickX / width) * duration;
  	}
  
  	// Get duration & currentTime for Time of song
  	function DurTime (e) {
	  	const {duration,currentTime} = e.srcElement;
	  	var sec;
	  	var sec_d;
  
		// Define minutes currentTime
		let min = (currentTime==null)? 0:
	   		Math.floor(currentTime/60);
	   		min = min <10 ? '0'+min:min;
  
	  	// define seconds currentTime
	  	function get_sec (x) {
		  	if(Math.floor(x) >= 60){
			  	for (var i = 1; i<=60; i++){
				  	if(Math.floor(x)>=(60*i) && Math.floor(x)<(60*(i+1))) {
					  	sec = Math.floor(x) - (60*i);
					  	sec = sec <10 ? '0'+sec:sec;
				  	}
			  	}
		  	}else{
			   	sec = Math.floor(x);
			   	sec = sec <10 ? '0'+sec:sec;
		   	}
	  	} 
  
	  	get_sec (currentTime,sec);
  
	  	// Change currentTime DOM
	  	currTime.innerHTML = min +':'+ sec;
  
	  	// Define minutes duration
	  	let min_d = (isNaN(duration) === true)? '0':
		  	Math.floor(duration/60);
	  	 min_d = min_d <10 ? '0'+min_d:min_d;
  
	   	function get_sec_d (x) {
		  	if(Math.floor(x) >= 60){
			  
			  	for (var i = 1; i<=60; i++){
				  	if(Math.floor(x)>=(60*i) && Math.floor(x)<(60*(i+1))) {
					  	sec_d = Math.floor(x) - (60*i);
					  	sec_d = sec_d <10 ? '0'+sec_d:sec_d;
				  	}
			  	}
		  	}else{
			   	sec_d = (isNaN(duration) === true)? '0':
			   	Math.floor(x);
			   	sec_d = sec_d <10 ? '0'+sec_d:sec_d;
		   	}
	  	} 
  
	  	// Define seconds duration
	  
	  	get_sec_d (duration);
  
	  	// change duration DOM
	  	durTime.innerHTML = min_d +':'+ sec_d;
		  
  	};
  
  	// Event listeners
  	playBtn.addEventListener('click', () => {
		const isPlaying = musicContainer.classList.contains('play');
  
		if (isPlaying) {
	  		pauseSong();
		} else {
	  		playSong();
		}
	});
  
  	// Change song
  	prevBtn.addEventListener('click', prevSong);
  	nextBtn.addEventListener('click', nextSong);
  
  	// Time/song update
  	audio.addEventListener('timeupdate', updateProgress);
  
  	// Click on progress bar
  	progressContainer.addEventListener('click', setProgress);
  
  	// Song ends
  	audio.addEventListener('ended', nextSong);
  
  	// Time of song
  	audio.addEventListener('timeupdate',DurTime);

}