import { useState } from 'react';
import geminlogo from './assets/Google-Gemini-Ai-Logo-PNG.png';
import './component/leftsidebar.css';
import send from './assets/send.png'
const LeftSidebar = () => {
    const [showHeader, setShowHeader] = useState(true);
    const [inputValue, setInputValue] = useState('');
    const [qaPairs, setQaPairs] = useState([]); // Array to store question-answer pairs
    const [loading  , setloding] = useState(false);

    const handleInputChange = (event) => {
        setInputValue(event.target.value); // Update state with input value
    };
    const handleClick = (question) => {
        setInputValue(question); // Populate input with the selected question
        search(question); // Call search with the selected question
    };
  

    const search = async () => {
        let api_key = "AIzaSyBMB1eByVbOQrDj5jwvLHmLX75PZzeU6NU";
        let url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${api_key}`;

        let res;
        try {
            setShowHeader(false);
            setloding(true);
            res = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [{ text: inputValue }] // Use the user's input
                        }
                    ]
                })
            });

            if (!res.ok) {
                throw new Error(`Error: ${res.status} - ${res.statusText}`);
            }

            let data = await res.json();
            const responseText = data.candidates[0].content.parts[0].text;

            // Update the state with the new question-answer pair
            setQaPairs([...qaPairs, { question: inputValue, answer: responseText }]);
            setInputValue(""); // Clear input field after sending

        } catch (error) {
            console.error("Fetch error: ", error);
        }
        setloding(false);
    };

    return (
        <>
            <div className="head">
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
                <h1 className='title'>Hello, Gemini-CHATBOT</h1>
                <img src={geminlogo} alt="Gemini AI Logo" />
            </div>
            <div>
                {showHeader ? (
                    <header>
                    <h2 className='title2'>How can I help you today...!</h2>
                    <ul className='unorderedlist'>
                        {["Create a cartoon illusion on my pet", 
                          "Give me a beginner's guide to an activity", 
                          "Write a letter to my landlord about a broken appliance", 
                          "Write code for a specific task, including edge cases"].map((question, index) => (
                            <li className='list' key={index} onClick={() => handleClick(question)}>
                                <h4>{question}</h4><br />
                                <span className="material-symbols-outlined">design_services</span>
                            </li>
                        ))}
                    </ul>
                </header>
                ) : (
                    <div className="content">
                        <>
                            
                        </>
                        {qaPairs.map((pair, index) => (
                            
                            <div key={index}>
                                <>
                            {loading?(
                                <h1>Loading...</h1>
                            ):(
                                null
                            )}
                        </>
                                <div className="qdiv">
                                <div dangerouslySetInnerHTML={{ __html: pair.question }} /> {/* Displaying question */}
                                </div>
                                <div className="q">
                                    
                                    <div dangerouslySetInnerHTML={{ __html: pair.answer }} />
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className="main-bottom">
                <div className="search-box">
                    <input
                        type="text"
                        placeholder="Message Gemini"
                        value={inputValue}
                        onChange={handleInputChange} // Capture input as user types
                    />
                    <button onClick={search}><img src={send} className='img'></img></button> {/* Button to trigger API call */}
                </div>
            </div>
            <div className="bottom-info">
                <p>
                    Gemini can make mistakes, so take important points.<br />
                    <span>Designed by Tharun</span>
                </p>
            </div>
        </>
    );
}

export default LeftSidebar;
