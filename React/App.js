import "./App.css";
import { useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useParams } from "react-router-dom";
import EmployeeList from "./components/EmployeeList";
import AddEmployee from "./components/AddEmployee";
import UpdateEmployee from "./components/UpdateEmployee";
import SearchEmployee from "./components/SearchEmployee";
import BirthdayList from "./components/BirthdayList";


function EmployeeListWrapper() {
    const navigate = useNavigate();
    return <EmployeeList navigate={navigate} />;
}

function BirthdayListWrapper() {
    const navigate = useNavigate();
    return <BirthdayList navigate={navigate} />;
}

function UpdateEmployeeWrapper() {
    const params = useParams();
    return <UpdateEmployee id={params.id} />;
}

function SearchEmployeeWrapper() {
    const params = useParams();
    return <SearchEmployee name={params.name} />;
}

function App() {
    return (
        <div>
            <Router>
                <Header />
                <div className="container">
                    <Routes>
                        <Route
                            path="/"
                            exact
                            element={<EmployeeListWrapper />}
                        />
                        <Route
                            path="/birthday"
                            exact
                            element={<BirthdayListWrapper />}
                        />
                        <Route
                            path="/employees"
                            element={<EmployeeListWrapper />}
                        />
                        <Route path="/add-employee" element={<AddEmployee />} />
                        <Route
                            path="/update-employee/:id"
                            element={<UpdateEmployeeWrapper />}
                        />
                        <Route
                            path="/search-employee/:name"
                            element={<SearchEmployeeWrapper />}
                        />
                    </Routes>
                </div>
                <Footer />
            </Router>
        </div>
    );
}

export default App;
