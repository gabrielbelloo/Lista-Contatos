import Filter from "./components/Filter.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Header from "./components/Header.jsx";
import ContactsList from "./components/ContactsList.jsx";
import ContactCard from "./components/ContactCard.jsx";

function App() {
  return (
    <div className="isolate h-screen w-screen bg-gray-950">
      <Header />
      <div className="py-8 px-8">
      <ContactsList />
      </div>
    </div>
  );
}

export default App;
