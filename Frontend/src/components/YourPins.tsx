import React, { useEffect, useState } from "react";
import axios from "axios";


const YourPins: React.FC = () => {
  const [pins, setPins] = useState([]);

  useEffect(() => {
    const username = localStorage.getItem("username2");

    if (username) {
      axios
        .get(`https://pixels-2umr.onrender.com/api/v1/user-pins/${username}`)
        .then((res) => setPins(res.data.pins))
        .catch((err) => console.error("Error fetching pins", err));
    }
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
   
      {pins.map((pin: any) => (
        <div key={pin.id} className="rounded-xl overflow-hidden shadow">
          <img src={pin.file_url} alt={pin.title} className="w-full h-100 object-cover" />
        
        </div>
      ))}
    </div>
  );
};

export default YourPins;
