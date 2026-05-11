import Kep from "./kepModulunk";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 ">
      <Kep kepekEgyediLeirasa="aron" kepEgyediUrl="home1.png"  egyediLoadingSzazalek="20"/>    
      <Kep kepekEgyediLeirasa="ketto" kepEgyediUrl="home2.png" egyediLoadingSzazalek="50"/>  
      <Kep kepekEgyediLeirasa="harom" kepEgyediUrl="home3.png" egyediLoadingSzazalek="80"/>  
    </div>
  );
}
