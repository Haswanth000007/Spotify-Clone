console.log("welcome to the spotify");

let songIndex=0;
let audioElement=new Audio('songs/Hukum.mp3');
let masterPlay=document.getElementById("masterPlay");
let myProgressBar=document.getElementById("myProgressBar");
let gif=document.getElementById("gif");
let songItems=Array.from(document.getElementsByClassName("songItem"));
let btmName=document.getElementById("btmName");
let songs=[
    {songName:"jailer-Hukum",filePath:"songs/Hukum.mp3",coverPath:"covers/hukum.png"},
    {songName:"yamadonga-Rubberu Gajulu",filePath:"songs/Rubberu Gajulu.mp3",coverPath:"covers/yamadonga.jpg"},
    {songName:"kgf2-The Monster",filePath:"songs/The Monster.mp3",coverPath:"covers/kgf2.jpg"},
    {songName:"kgf1-Salam Rocky bhai",filePath:"songs/Rocky Bhai.mp3",coverPath:"covers/kgf1.jpg"},
    {songName:"master-Vathi Coming",filePath:"songs/varman.mp3",coverPath:"covers/beast.jpg"}
];

//first we need to handle play and pause clicks
masterPlay.addEventListener("click",() =>
{
    if(audioElement.paused || audioElement.currentTime<=0)
    {
        audioElement.play();
        masterPlay.classList.remove("fa-play");
        masterPlay.classList.add("fa-pause");
        gif.style.opacity=1;
        btmName.innerText=songs[songIndex].songName;
    }
    else
    {
        audioElement.pause();
        masterPlay.classList.remove("fa-pause");
        masterPlay.classList.add("fa-play");
        gif.style.opacity=0;
        btmName.innerText='Press the play Button to Listen';
    }
});

//updating the images and name of the songs using programming forEach logic
songItems.forEach((element,i) =>
{
    console.log(element,i);
    element.getElementsByTagName("img")[0].src=songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText=songs[i].songName;

});

//updating seekbar
audioElement.addEventListener("timeupdate",() =>
{
    progress=parseInt(((audioElement.currentTime/audioElement.duration)*100));
    myProgressBar.value=progress;
});

//seeking theaudio to the current pos where my myProgressBar is!!!

myProgressBar.addEventListener("change",()=>
{
    audioElement.currentTime=parseInt((myProgressBar.value*audioElement.duration)/100);

});

//making all play buttons as pause intially using the function

const makeAllPlays=()=>
{
    Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) =>
    {
        element.classList.add("fa-play");
    });   
};

//making play buttons as pause and playing the current song

Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) =>
{
    element.addEventListener("click",(e)=>
    {
        makeAllPlays();
        prev_index=songIndex;
        songIndex=parseInt(e.target.id);
        console.log(songIndex);
        if(audioElement.paused || audioElement.currentTime<=0 || prev_index!=songIndex)
        {
            e.target.classList.remove("fa-play");
            e.target.classList.add("fa-pause");
            audioElement.src=songs[songIndex].filePath;
            audioElement.currentTime=0;
            audioElement.play();
            masterPlay.classList.remove("fa-play");
            masterPlay.classList.add("fa-pause");
            gif.style.opacity=1;
            btmName.innerText=songs[songIndex].songName;
        }
        else
        {
            e.target.classList.remove("fa-pause");
            e.target.classList.add("fa-play");
            audioElement.pause();
            masterPlay.classList.remove("fa-pause");
            masterPlay.classList.add("fa-play");
            gif.style.opacity=0;
            btmName.innerText='Press the play Button to Listen';
        }

    });
});


//handling the next icon case

document.getElementById("next").addEventListener("click",()=>
{
    if(songIndex==4) 
    {
        songIndex=0;
    }
    else
    {
        songIndex+=1;
    }
    audioElement.src=songs[songIndex].filePath;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove("fa-play");
    masterPlay.classList.add("fa-pause");
    gif.style.opacity=1;
    btmName.innerText=songs[songIndex].songName;
});

//handling the previous icon case

document.getElementById("previous").addEventListener("click",()=>
{
    if(songIndex==0) 
    {
        songIndex=4;
    }
    else
    {
        songIndex-=1;
    }
    audioElement.src=songs[songIndex].filePath;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove("fa-play");
    masterPlay.classList.add("fa-pause");
    gif.style.opacity=1;
    btmName.innerText=songs[songIndex].songName;
});


