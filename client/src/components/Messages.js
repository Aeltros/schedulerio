import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faBell, faReply, faCheck } from "@fortawesome/free-solid-svg-icons";
 import "./Message.css";
import axios from "axios";
import { Select } from "antd";
import { useEffect, useState } from "react";
import LayoutServ from "../components/LayoutServ";



function Messages() {//   // State to store all messages
    const [messages, setMessages] = useState([]);
    // State to store the count of unseen notifications
    const [unseenNotifications, setUnseenNotifications] = useState(0);
    // State to store all users
    const [users, setUsers] = useState([]);
    // State to store the selected user to send a message to
    const [selectedUser, setSelectedUser] = useState(null);
    // State to store the currently viewed message
    const [currentMessage, setCurrentMessage] = useState(null);
    // State to store the message input value
    const [messageValue, setMessageValue] = useState("");
   
    // Fetch messages and notifications, and users from backend on component mount
    useEffect(() => {
      axios.get("/api/messages").then((response) => {
        setMessages(response.data.messages);
        setUnseenNotifications(response.data.unseenNotifications);
      });
  

   

      // 
      axios.get("/api/get-all-doctors").then((response) => {
        setUsers(response.data);
      });
    }, []);

























  
    // Handle change event for user selection
    const handleSelectChange = (value) => {
      setSelectedUser(value);
    };
  
    // Send message to selected user
    const sendMessage = (e) => {
      e.preventDefault();
      axios
        .post("/api/messages", {
          recipient: selectedUser,
          message: messageValue,
        })
        .then((response) => {
          setMessages([...messages, response.data]);
          setMessageValue("");
        });
    };
  
    // Handle message input change
    const handleMessageInput = (e) => {
      setMessageValue(e.target.value);
    };
  
    // Mark message as seen and set it as the currently viewed message
    const viewMessage = (message) => {
      axios.patch(`/api/messages/${message._id}`).then((response) => {
        setMessages(
          messages.map((m) => {
            if (m._id === message._id) {
              return { ...m, seen: true };
            } else {
              return m;
            }
          })
        );
        setUnseenNotifications(unseenNotifications - 1);
      });
      setCurrentMessage(message);
    };
  
    // Set the selected user to the sender of the currently viewed message
    const replyToMessage = () => {
      setSelectedUser(currentMessage.sender);
    };
  
    // Go back to the message list
    
  
  
  
    // Go back to the message list
    const goBackToMessages = () => {
      setCurrentMessage(null);
    };
  
    // Delete a message from the backend and update the message list
    const deleteMessage = (message) => {
      axios.delete(`/api/messages/${message._id}`).then((response) => {
        setMessages(messages.filter((m) => m._id !== message._id));
      });
    };
  
    return (

      <LayoutServ>
 
      <div className="messaging">
          <div className="messaging-header">
              <FontAwesomeIcon icon={faEnvelope} className="messaging-icon" />
              <span className="messaging-text">Messages</span>
              <FontAwesomeIcon icon={faBell} className="notification-icon" />
              <span className="notification-count">{unseenNotifications}</span>
          </div>
          {currentMessage ? (
              <div className="current-message">
                  <div className="message-header">
                      <span className="message-sender">{currentMessage.sender}</span>
                      <span className="message-date">
                          {new Date(currentMessage.date).toLocaleString()}
                      </span>
                      {currentMessage.seen && <FontAwesomeIcon icon={faCheck} className="message-seen-icon" />}
                  </div>
                  <div className="message-content">
                      {currentMessage.message}
                  </div>
                  <div className="message-actions">
                      <button onClick={() => replyToMessage()}>
                          <FontAwesomeIcon icon={faReply} className="message-reply-icon" />
                          Reply
                      </button>
                      <button onClick={() => deleteMessage(currentMessage)}>
                          Delete
                      </button>
                      <button onClick={() => goBackToMessages()}>
                          Back
                      </button>
                  </div>
              </div>
          ) : (
              <div className="message-list">
                  <div className="message-compose">
                      <form onSubmit={sendMessage}>
                          <Select
                              showSearch
                              placeholder="Select a recipient"
                              optionFilterProp="children"
                              onChange={handleSelectChange}
                              filterOption={(input, option) =>
                                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                              }
                          >
                              {users.map((user) => (
                                  <Select.Option key={user._id} value={user._id}>
                                      {user.username}
                                  </Select.Option>
                              ))}
                          </Select>
                          <textarea
                              placeholder="Enter message"
                              name="message"
                              onChange={handleMessageInput}
                          ></textarea>
                          <button type="submit">Send</button>
                      </form>
                  </div>
                  <div className="message-threads">
                      {messages.map((message) => (
                          <div
                             key={message._id}
                              className={`message-thread ${message.seen ? 'seen' : 'unseen'}`}
                              onClick={() => viewMessage(message)}
                          >
  
                              <div className="message-sender">{message.sender}</div>
                              <div className="message-preview">{message.message}</div>
                              <div className="message-date">
                                  {new Date(message.date).toLocaleString()}
                                  </div>
                          </div>
                      ))}
                  </div>
              </div>
          )}
      </div>
    
      </LayoutServ>
  )};

export default Messages
