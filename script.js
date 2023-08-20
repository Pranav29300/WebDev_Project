console.log("Welcome to Spotif-i");

//we are having an array of objects
let songIndex = 0; // initially 0th song will be played
let audioElement = new Audio('Songs/1.mp3'); // ad the location as well when you want to play an audio
let masterPlay = document.getElementById('masterPlay');  //create a variable for master play button
let songItemPlay = document.getElementsByClassName('songItemPlay');
let ProgressBar = document.getElementById('ProgressBar'); // same for the progress bar
let gif = document.getElementById('gif'); //create a varible for gif so we can access its opacity when master play button is accessed
let songItems = Array.from(document.getElementsByClassName('song1')); //The from() method creates a new array from any array-like or iterable object.since its an html collection
let MasterSongName = document.getElementById('MasterSongName'); //we created a variable for master song name in the bottom

let songs = [
    {songName: "Linking park - Faint", filePath: "Songs/1.mp3", coverPath: "cover photos/cover1.jpg"},
    {songName: "A. Tiwari - Teri Galliyan", filePath: "Songs/2.mp3", coverPath: "cover photos/cover2.jpg"},
    {songName: "B. Adams - Summer of 69", filePath: "Songs/3.mp3", coverPath: "cover photos/cover3.jpg"},
    {songName: "Atif Aslam - Aadat", filePath: "Songs/4.mp3", coverPath: "cover photos/cover4.jpg"},
    {songName: "Daaku ek No.", filePath: "Songs/5.mp3", coverPath: "cover photos/cover5.jpg"}, 
    {songName: "Naaiyno Walle Ne", filePath: "Songs/6.mp3", coverPath: "cover photos/cover6.jpg"},
    {songName: "Saiyonee - Coke Studios", filePath: "Songs/7.mp3", coverPath: "cover photos/cover7.jpg"},
    {songName: "Levitating - Dua Lipp", filePath: "Songs/8.mp3", coverPath: "cover photos/cover8.jpg"},
    {songName: "Moon Diety - Neon Blade", filePath: "Songs/9.mp3", coverPath: "cover photos/cover9.jpg"},
    {songName: "Faided - Allen Walke", filePath: "Songs/10.mp3", coverPath: "cover photos/cover10.jpg"},
]

// songItems.foreach will take a call back function
songItems.forEach((element, i)=>{
    //we are accessing the location of the songs and cover photos using javaScript as well
        // console.log(element, i); //this will give all the div tags with class song1 
        element.getElementsByTagName("img")[0].src = songs[i].coverPath;//src of image is given by coverpath
        element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});



//Handle play pause click by adding a click event
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime <= 0) // curr time <= 0 means audio has not been played we play the audio then we display "pause" in masterplay 
    {
       audioElement.play(); 
       masterPlay.classList.remove('fa-circle-play');
       masterPlay.classList.add('fa-circle-pause');
       gif.style.opacity = 1;
    }
    else
    {
        //when audio is playing and we  press the masterplay button song will be paused but master play will show "play"
        audioElement.pause(); 
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }
});

//we want to listen timeupdate in the audio element ye audio ka event hai
audioElement.addEventListener('timeupdate', ()=>{

    // console.log('timeupdate');
    // update seek bar
    // now we update the ProgressBar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100); // progress ham percentage me nikal rhe hai.parsInt is used as we want it in intiger, use mathematics so console can display the cong coverd in percentage intiger currentTime devided by dutation * 100
    // console.log(progress);
    //now the progress bar can traverse when played
    ProgressBar.value = progress; 

})

//we put a change event in my progress bar
ProgressBar.addEventListener('change', ()=>{
    //now whe the position of progressBar changes we want to change the audio as well
    audioElement.currentTime = ProgressBar.value*audioElement.duration/100 //what ever the value of the progress bar it will be changed from percentge to duration, we multiply value*duration and devide it by 100 se we get the value in duration

})

const MakeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>  //its an html collection so we use array.from
{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
})

}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>  //its an html collection so we use array.from
{
    //e we hai jisper click hua
    element.addEventListener('click', (e)=>
    {
        console.log(e.target); //e.target will give us the element that is clicked here its the play circle icon
        //MakeAllPlays() function helps to play the targetted song and display a pause circle at it and add a play circle that was previously being played, that means only one song is played at a time
        MakeAllPlays();
        
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src = `Songs/${songIndex+1}.mp3`;
        audioElement.currentTime = 0;
        audioElement.play();
        MasterSongName.innerText = songs[songIndex].songName;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex >= 9)
    {
        songIndex = 0;
    }
    else
    {
        songIndex = songIndex + 1;
    }

    audioElement.src = `Songs/${songIndex+1}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    MasterSongName.innerText = songs[songIndex].songName;
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    gif.style.opacity = 1;
})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex <= 0)
    {
        songIndex = 0;
    }
    else
    {
        songIndex = songIndex - 1;
    }

    audioElement.src = `Songs/${songIndex+1}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    MasterSongName.innerText = songs[songIndex].songName;
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    gif.style.opacity = 1;
})



