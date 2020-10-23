import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import '../index.css';
import { useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
// import MoonLoader from "react-spinners/MoonLoader";



export default function CreatePost(props) {
  const btnStyle = {

    padding: "10px",
    width: "100px",
    border: "none",
    color: "#fff",
    background: "rgb(5, 5, 182)",
    cursor: "pointer",
    boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.76)",

  }
  //   const override = `
  //   display: block;
  //   margin: 0 auto;
  // `;
  const [title, setTitle] = useState('');
  const [post_image, setFile] = useState('');
  const [post, setPost] = useState('');
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);

  const imageRender = (e) => {
    let fileReader = new FileReader();

    // setImage(URL.createObjectURL(e.target.files[0]))

    fileReader.readAsDataURL(e.target.files[0]);

    fileReader.onload = e => {
      setFile(e.target.result);
      console.log(e.target.result);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { title: title, post_image: post_image, post: post };

    const url = "http://127.0.0.1:8000/api/storepost";
    axios.post(url, data)
      .then(res => {
        console.log(res)

      })
      .catch(error => {
        console.log(error);
      })

  }

  const token = props.token;
  const userUrl = "http://blogsite.test/api/auth/me";

  useEffect(() => {
    setLoading(true);
    axios.post(userUrl, { token })
      .then(res => {
        setLoading(false);
        const userData = res.data;
        setUser(userData);
  


      })
      .catch((error) => {
        console.log(error)
        const status = error.response.status;
        if (status === 401 && props.isAuthenticated) {
          // logged in but invalid jwt
          props.refresh();
        }
      });
      
  }, [token])




  return (
    <>
      <div className="CreatePost">
        <div className="User-sidebar">

        </div>
        <div className="User-post">
          <form className="form" onSubmit={handleSubmit}>
            <h2 className="mb-10">Create Post</h2>
            <label className="title_label mb-10">Ttile:</label>
            <input className="br-10" type="text" name="title" onChange={(e) => { setTitle(e.target.value) }}></input>

            <label className="image_label mb-10 mt-10">Add Image</label>
            <input type="file" name="post_image" onChange={imageRender}></input>

            <label className="title_label mb-10 mt-10">Create Post:</label>
            {/* <textarea className="br-10" type="text" rows="10" name="post" onChange={(e) => { setPost(e.target.value) }}></textarea> */}
            <Editor
              // initialValue="<p>This is the initial content of the editor</p>"

              apiKey="5a5w5rxrc6ct2mlslfu2xytnbaxh2d1x05qsvezi0iii0xcv"
              init={{
                height: 300,
                menubar: false,
                plugins: [
                  'advlist autolink lists link image charmap print preview anchor',
                  'searchreplace visualblocks code fullscreen',
                  'insertdatetime media table paste code help wordcount'
                ],
                toolbar:
                  'undo redo | formatselect | bold italic backcolor | \
             alignleft aligncenter alignright alignjustify | \
             bullist numlist outdent indent | removeformat | help'
              }}
              onChange={(e) => { setPost(e.target.getContent()); }}
            />

            <button style={btnStyle} type="submit" className="save_btn mt-10 br-10">Publish</button>

          </form>
        </div>

        <div className="User-profile">
          <div className="My-profile">
            <h3>About</h3>
          </div>
          <div className="Profile-content" >
            {loading ? <div>
                    <MoonLoader
                        css={override}
                        size={50}
                        margin={'auto'}
                        color={"#36D7B7"}
                        loading={loading}
                    />
                </div> : ""}
            <table>
              <tr style={{ textAlign: "center" }}>
                <td>Username:</td>
                <td style={{ fontWeight: "bold" }}>{user.username}</td>
              </tr>
              <tr style={{ textAlign: "center" }}>
                <td>Email:</td>
                <td style={{ fontWeight: "bold" }}>{user.email}</td>
              </tr>
              <tr style={{ textAlign: "center" }}>
                <td>UserID:</td>
                <td style={{ fontWeight: "bold" }}>{user.user_id}</td>
              </tr>
            </table>
          </div>

        </div>
      </div>
    </>
  )
}
