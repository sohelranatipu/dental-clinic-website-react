import { useEffect, useState } from "react";

const useDentists = () => {
  const [dentists, setDentists] = useState([]);

  useEffect(() => {
    fetch("/Dentists.json")
      .then((res) => res.json())
      .then((data) => setDentists(data));
  }, []);

  return { dentists };
};

export default useDentists;
