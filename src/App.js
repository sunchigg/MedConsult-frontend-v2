import './App.css';
import React, {useState} from "react";
import Home from "./containers/Home";
import ChestReportPage from "./containers/ChestReportPage";
import MessageRoomPage from "./containers/MessageRoomPage";
import AskKeyPage from './containers/AskKeyPage';
import useScript from './functions/UseScript';

function App() {

    useScript("https://cdn.jsdelivr.net/npm/ionicons/dist/ionicons/ionicons.js");

    const [apiKey, setApiKey] = useState("");
    const [report, setReport] = useState("");

    const renderPage = () => {
        if (apiKey.length === 0) return <AskKeyPage setApiKey={setApiKey}/>;
        if (report.length === 0) return <ChestReportPage setReport={setReport}/>;
        return <MessageRoomPage apiKey={apiKey} setApiKey={setApiKey} report={report}/>;
    };

    return (
        <div className="App" style={{marginTop:"30px"}}>
            {renderPage()}
        </div>
    );
}

export default App;
