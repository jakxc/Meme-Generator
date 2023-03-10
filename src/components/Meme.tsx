import { useState, useEffect, ChangeEvent } from "react";

function Meme()
{
    const [meme, setMeme] = useState({
        topText: "",
        bottomText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg" 
    })
    
    const [allMemes, setAllMemes] = useState([] as any[]);
    const [loading, setLoading] = useState(false);
    const [error, setError]= useState(null);

    useEffect(() => {
        setLoading(true)
        fetch("https://api.imgflip.com/get_memes")
        .then(res => res.json())
        .then(data => setAllMemes(data.data.memes))
        .then(() => setLoading(false))
        .catch(err => setError(err))
    }, [])
    
    
    function getMemeImage() {
        const randomNumber = Math.floor(Math.random() * allMemes.length)
        const url = allMemes[randomNumber].url
        setMeme(prevMeme => ({
            ...prevMeme,
            randomImage: url
        }))  
    }

    /*Event listener for input and button*/ 
    function handleChange(event: ChangeEvent<HTMLInputElement>)
    {
        const {name, value} = event.target;

        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value
        }))  
    }

    if (loading) 
    {
        return (
            <h1>Loading...</h1>
        )
    }  

    if (error) 
    {
        return <pre>{JSON.stringify(error)}</pre>
    }
    
    return (
        <main>
            <div className="form">
                <input 
                    type="text"
                    placeholder="Top text"
                    className="form-input"
                    name="topText"
                    value={meme.topText}
                    onChange={handleChange}
                />
                <input 
                    type="text"
                    placeholder="Bottom text"
                    className="form-input"
                    name="bottomText"
                    value={meme.bottomText}
                    onChange={handleChange}
                />
                <button 
                    className="form-button"
                    onClick={getMemeImage}
                >
                    Get a new meme image ????
                </button>
            </div>
            <div className="meme">
                <img src={meme.randomImage} className="meme-image" />
                <h2 className="meme-text top">{meme.topText}</h2>
                <h2 className="meme-text bottom">{meme.bottomText}</h2>
            </div>
        </main>
    )
}

export default Meme