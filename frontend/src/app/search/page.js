// 'use client'
// import { useState } from 'react'
// import { Button, Input } from '@chakra-ui/react'
// import axios from 'axios'

// export default function UserForm() {
//   const [username, setUsername] = useState('')
//   const [question, setQuestion] = useState('')
//   const [message, setMessage] = useState('')

//   const handleUsernameChange = (e) => {
//     setUsername(e.target.value)
//   }

//   const handleQuestionChange = (e) => {
//     setQuestion(e.target.value)
//   }

// //   const handleSubmit = async () => {
// //     if (username && question) {
// //       const formData = new FormData()
// //       formData.append('username', username)
// //       formData.append('question', question)
// //       const response = await fetch('/api/submit', {
// //         method: 'POST',
// //         body: formData,
// //       })
// //       if (response.ok) {
// //         // set the message state variable to the success message
// //         setMessage('Form submitted successfully')
// //       } else {
// //         // set the message state variable to the error message
// //         setMessage('Something went wrong')
// //       }
// //     } else {
// //       // set the message state variable to the validation message
// //       setMessage('Please fill all the fields')
// //     }
// //   }

// // import axios at the top of the file

// // use axios.post instead of fetch
// const handleSubmit = async () => {
//   if (username && question) {
//     // create an object with the username and question properties
//     const data = {
//       username,
//       question
//     }
//     // use axios.post to send the data to the url
//     axios.post('/search', data)
//       .then(function (response) {
//         // set the message state variable to the success message
//         setMessage('Form submitted successfully')
//       })
//       .catch(function (error) {
//         // set the message state variable to the error message
//         setMessage('Something went wrong')
//       })
//   } else {
//     // set the message state variable to the validation message
//     setMessage('Please fill all the fields')
//   }
// }

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen" class = "dk">
//       <h1 className="text-4xl font-bold text-pink-600 mb-4">User Form</h1>
//       <div className="max-w-md p-4 bg-white shadow-lg rounded-lg">
//         <Input type="text" placeholder="Username" value={username} onChange={handleUsernameChange} className="border border-gray-300 p-2 rounded-md mb-2" />
//         <Input type="text" placeholder="Question" value={question} onChange={handleQuestionChange} className="border border-gray-300 p-2 rounded-md mb-2" />
//         <Button onClick={handleSubmit} className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Submit</Button>
//         <div className="border border-gray-300 p-2 rounded-md mt-2">
//           <p className="text-gray-600">{message}</p>
//         </div>
//       </div>

//     </div>
//   )
// }
// front-end file
"use client";
import { useState } from "react";
import { Button, Input } from "@chakra-ui/react";
import axios from "axios";

export default function UserForm() {
    const [username, setUsername] = useState("");
    const [question, setQuestion] = useState("");
    const [message, setMessage] = useState("");

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handleQuestionChange = (e) => {
        setQuestion(e.target.value);
    };

    // use axios.post instead of fetch
    const handleSubmit = async () => {
        if (username && question) {
            // create an object with the username and question properties
            const data = {
                username,
                question,
            };
            // use axios.post to send the data to the url
            axios
                .post("/search", data, {
                  headers: {
                    'Content-Type': 'application/json'
                  }
                })
                .then(function (response) {
                    // access the response data
                    console.log(response.data);
                    // set the message state variable to the response data
                    setMessage("The server responded with: " + response.data);
                })
                .catch(function (error) {
                    // access the error response data
                    console.log(error.response.data);
                    // set the message state variable to the error message
                    setMessage(
                        "The server responded with: " +
                            error.response.data +
                            ". Please try again later."
                    );
                });
        } else {
            // set the message state variable to the validation message
            setMessage("Please fill all the fields");
        }
    };

    return (
        <div
            className="flex flex-col items-center justify-center min-h-screen"
            class="dk"
        >
            <h1 className="text-4xl font-bold text-pink-600 mb-4">User Form</h1>
            <div className="max-w-md p-4 bg-white shadow-lg rounded-lg">
                <Input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={handleUsernameChange}
                    className="border border-gray-300 p-2 rounded-md mb-2"
                />
                <Input
                    type="text"
                    placeholder="Question"
                    value={question}
                    onChange={handleQuestionChange}
                    className="border border-gray-300 p-2 rounded-md mb-2"
                />
                <Button
                    onClick={handleSubmit}
                    className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                    Submit
                </Button>
                <div className="border border-gray-300 p-2 rounded-md mt-2">
                    <p className="text-gray-600">{message}</p>
                </div>
            </div>
        </div>
    );
}
