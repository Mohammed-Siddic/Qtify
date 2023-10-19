import { useEffect, useState } from 'react';
import Hero from './components/Hero/Hero';
import Navbar from './components/Navbar/Navbar';
import { fetchTopAlbums,  fetchSongs } from './api/api';
import { Section } from './components/Section/Section';
import styles from './App.module.css'


function App() {
  const [data, setData] = useState([]);
  const [songsData, setSongsData] = useState([]);
  const [filteredDataValues, setFilteredDataValues] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [value, setValue] = useState(0);

  const handleToggle = () => {
    setToggle(!toggle)
  };
  const handleChange = (event, newValue) => {
    setValue(newValue)
  };
  const generateSongsData = (value) => {
    let key;
    if(value === 0){
      filteredData(songsData);
      return;
    }else if (value === 1){
      key = 'rock';
    }else if (value === 2){
      key = 'pop';
    }
    const res = songsData.filter((item) => item.genre.key === key)
    filteredData(res)
  }


  useEffect(() => {
    generateSongsData(value);
    // eslint-disable-next-line
  }, [value])

  const generateData = async () => {
    try {
      const res = await fetchTopAlbums();
      setData(res);
    }catch(err){
      console.log(err)
    }
  }

  const generateAllSongsData = async () => {
    try {
      const res = await fetchSongs();
      setSongsData(res);
      setFilteredDataValues(res);
    }catch(err){
      console.log(err)
    }
  }

  const filteredData = (val) => {
    setFilteredDataValues(val)
  }

  useEffect(() => {
    generateData();
    generateAllSongsData();
  }, [])


  return (
    <div>
      <Navbar data={data} />
      <Hero />
    <div className={styles.sectionWrapper}>
      <Section data={data} type="album" title="Top Albums" filteredDataValues={data} />
      <br/>
      <Section data={data} type="album" title="New Albums" filteredDataValues={data} />
      <br />
      <Section data={songsData} type="song" title="songs" filteredData={filteredData} filteredDataValues={filteredDataValues}
       value={value} handleToggle={handleToggle} handleChange={handleChange} />
    </div>
    </div>
  );
  }
export default App;
