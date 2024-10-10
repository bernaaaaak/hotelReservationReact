import React, { useState, useRef } from 'react';
import {
  TextField, Select, MenuItem, FormControl, InputLabel, Button, Checkbox, ListItemText, Box, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, Switch, Typography
} from '@mui/material';
import InputMask from 'react-input-mask';
import '../styles/Admin.css';

const Admin = () => {
  const [hotelName, setHotelName] = useState('');
  const [hotelType, setHotelType] = useState('');
  const [starRating, setStarRating] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');
  const [address, setAddress] = useState('');
  const [accommodationType, setAccommodationType] = useState("");
  const [accomudatipnTypePrice, setAccomudatipnTypePrice] = useState("");
  const [currentAccommodationDetails, setCurrentAccommodationDetails] = useState({
    accommodationType: '',
    accommodationPrice: ''
  });
  const [roomDetails, setRoomDetails] = useState([]);
  const [currentRoomDetails, setCurrentRoomDetails] = useState({
    roomType: '',
    price: '',
    roomAmenities: {
      jacuzzi: false, beds: 0, ac: false, minibar: false, balcony: false,
    },
    roomNumbers: [],
    viewType: []
  });
  const [hotelPhotos, setHotelPhotos] = useState([]); // Otel fotoğrafları için

  const [hotelAmenities, setHotelAmenities] = useState([]);

  const [openRoom, setOpenRoom] = useState(false);
  const [openAccommodation, setOpenAccommodation] = useState(false);

  const fileInputRef = useRef(null);
//TODO:
  const handleSubmit = (event) => {
    event.preventDefault();
    const hotelData = {
      hotelName,
      hotelType,
      starRating,
      phone,
      email,
      location: { country, city, state:city },
      accomudationType: accommodationType,
      accomudatipnTypePrice : accomudatipnTypePrice,
      rooms: roomDetails,
      hotelPhotos,
      amentities :hotelAmenities,
    };
    console.log('Hotel Data:', hotelData);

    fetch('http://localhost:8080/hotel', {  // Burada backend URL'inizi kullanın
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(hotelData),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handleRoomTypeChange = (event) => {
    setCurrentRoomDetails({ ...currentRoomDetails, roomType: event.target.value });
    setOpenRoom(true); // Oda tipi seçildiğinde modalı aç
  };

  const handleAccommodationTypeChange = (event) => {
    setCurrentAccommodationDetails({ ...currentAccommodationDetails, accommodationType: event.target.value });
    setOpenAccommodation(true); // Konaklama tipi seçildiğinde modalı aç
  };

  const handleModalRoomClose = () => {
    setOpenRoom(false); // Modalı kapat
  };

  const handleModalAccommodationClose = () => {
    setOpenAccommodation(false); // Modalı kapat
  };

  const handleRoomSave = () => {
    setRoomDetails([...roomDetails, currentRoomDetails]);
    setCurrentRoomDetails({
      roomType: '',
      price: 0,
      // roomAmenities: {
      //   jacuzzi: false, beds: 0, ac: false, minibar: false, balcony: false,
      // },
      totalRoomCount: 0,
      viewType: []
    });
    setOpenRoom(false); // Modalı kapat
  };

  const handleRoomNumberChange = (event) => {
    const value = event.target.value //event.target.value.split(',').map(num => num.trim());
    setCurrentRoomDetails({ ...currentRoomDetails, totalRoomCount: value });
  };

  const handleViewTypeChange = (event) => {
    setCurrentRoomDetails({ ...currentRoomDetails, viewType: event.target.value });
  };

  const handlepriceChange = (event) => {
    setCurrentRoomDetails({ ...currentRoomDetails, price: event.target.value });
  };

  const handleRoomAmenityChange = (name) => (event) => {
    setCurrentRoomDetails({
      ...currentRoomDetails,
      roomAmenities: { ...currentRoomDetails.roomAmenities, [name]: event.target.checked }
    });
  };

  const handleAccommodationPriceChange = (event) => {
    setCurrentAccommodationDetails({ ...currentAccommodationDetails, accommodationPrice: event.target.value });
  };

  const handlePhotoUpload = (event) => {
    const files = event.target.files;
    if (files.length + hotelPhotos.length > 5) {
      alert("En fazla 5 fotoğraf yükleyebilirsiniz.");
      return;
    }

    const updatedPhotos = [...hotelPhotos];
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updatedPhotos.push(reader.result);
        if (updatedPhotos.length <= 5) {
          setHotelPhotos(updatedPhotos);
        }
      };
      reader.readAsDataURL(files[i]);
    }
  };

  const amenitiesList = ['Spa', 'WiFi', 'Bar', 'Parking', 'Pool', 'Beach', 'Honeymoon Suite', 'Child Friendly', 'Pet Friendly', 'Safe'];

  const handleAmenityChange = (event) => {
    const value = event.target.value;
    setHotelAmenities(typeof value === 'string' ? value.split(',') : value);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{
      padding: '20px', maxWidth: '800px', margin: 'auto', backgroundColor: '#f9f9f9', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    }}
    >
      <h2>Otel Bilgileri Ekle</h2>

      <TextField label="Otel Adı" value={hotelName} onChange={(e) => setHotelName(e.target.value)} fullWidth margin="normal" required />

      <FormControl fullWidth margin="normal" required>
        <InputLabel>Otel Tipi</InputLabel>
        <Select value={hotelType} onChange={(e) => setHotelType(e.target.value)} required>
          <MenuItem value="resort">Resort</MenuItem>
          <MenuItem value="hotel">Hotel</MenuItem>
          <MenuItem value="apart">Apart</MenuItem>
          <MenuItem value="hostel">Hostel</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal" required>
        <InputLabel>Yıldız Derecelendirmesi</InputLabel>
        <Select value={starRating} onChange={(e) => setStarRating(e.target.value)} required>
          <MenuItem value={1}>1 Yıldız</MenuItem>
          <MenuItem value={2}>2 Yıldız</MenuItem>
          <MenuItem value={3}>3 Yıldız</MenuItem>
          <MenuItem value={4}>4 Yıldız</MenuItem>
          <MenuItem value={5}>5 Yıldız</MenuItem>
        </Select>
      </FormControl>

      <InputMask
        mask="(999) 999-9999"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
      >
        {() => <TextField label="Telefon" fullWidth margin="normal" required />}
      </InputMask>
      <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth margin="normal" type="email" required />

      <FormControl fullWidth margin="normal" required>
        <InputLabel>Ülke</InputLabel>
        <Select value={country} onChange={(e) => setCountry(e.target.value)} required>
          <MenuItem value="TR">Turkey</MenuItem>
          <MenuItem value="US">United States</MenuItem>
          <MenuItem value="DE">Germany</MenuItem>
          <MenuItem value="FR">France</MenuItem>
          <MenuItem value="ES">Spain</MenuItem>
          <MenuItem value="IT">Italy</MenuItem>
        </Select>
      </FormControl>

      <TextField label="Şehir" value={city} onChange={(e) => setCity(e.target.value)} fullWidth margin="normal" required />
      <TextField label="İlçe" value={district} onChange={(e) => setDistrict(e.target.value)} fullWidth margin="normal" required />
      <TextField label="Açık Adres" value={address} onChange={(e) => setAddress(e.target.value)} fullWidth margin="normal" required />

      <h3>Otel Fotoğrafları</h3>
      <input
        type="file"
        accept="image/*"
        multiple
        ref={fileInputRef}
        onChange={handlePhotoUpload}
      />
      <Box sx={{ display: 'flex', flexWrap: 'wrap', mt: 2 }}>
        {hotelPhotos.map((photo, index) => (
          <Box key={index} sx={{ width: '100px', height: '100px', marginRight: '10px', marginBottom: '10px' }}>
            <img src={photo} alt={`Hotel Photo ${index + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </Box>
        ))}
      </Box>

      <h3>Konaklama Tipleri ve Fiyatları</h3>
      <FormControl fullWidth margin="normal" required>
            <InputLabel>Konaklama Tipi</InputLabel>
            <Select value={accommodationType} onChange={(e) => setAccommodationType(e.target.value)} required>
              <MenuItem value="suite">Süit</MenuItem>
              <MenuItem value="standard">Standart</MenuItem>
              <MenuItem value="large">Büyük Oda</MenuItem>
            </Select>
          </FormControl>
          <TextField label="Fiyat" type="number" fullWidth margin="normal" value={accomudatipnTypePrice} onChange={(e) => setAccomudatipnTypePrice(e.target.value)}required />

      <h3>Oda Tipleri ve Fiyatları</h3>
      {roomDetails.map((room, index) => (
        <Box key={index} sx={{ mb: 2, p: 2, border: '1px solid #ccc', borderRadius: '5px' }}>
          <Typography variant="h6">Oda Tipi: {room.roomType}</Typography>
          <Typography>Fiyat: {room.price}</Typography>
          <Typography>Manzara Tipi: {room.viewType.join(', ')}</Typography>
          <Typography>Oda Numaraları: {room.roomNumbers.join(', ')}</Typography>
          <Typography>Oda Özellikleri:</Typography>
          <ul>
            {Object.entries(room.roomAmenities).map(([key, value]) => (
              <li key={key}>{key}: {value ? 'Var' : 'Yok'}</li>
            ))}
          </ul>
        </Box>
      ))}
      <Button variant="contained" onClick={() => setOpenRoom(true)}>Oda Ekle</Button>

      <h3>Otel Özellikleri</h3>
      <FormControl fullWidth margin="normal">
        <InputLabel>Otel Özellikleri</InputLabel>
        <Select
          multiple
          value={hotelAmenities}
          onChange={handleAmenityChange}
          renderValue={(selected) => selected.join(', ')}
        >
          {amenitiesList.map((amenity) => (
            <MenuItem key={amenity} value={amenity}>
              <Checkbox checked={hotelAmenities.indexOf(amenity) > -1} />
              <ListItemText primary={amenity} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Kayıt Ol
      </Button>

      <Dialog open={openRoom} onClose={handleModalRoomClose}>
        <DialogTitle>Oda Bilgileri Ekle</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="normal" required>
            <InputLabel>Oda Tipi</InputLabel>
            <Select value={currentRoomDetails.roomType} onChange={(e) => setCurrentRoomDetails({ ...currentRoomDetails, roomType: e.target.value })} required>
              <MenuItem value="suite">Süit</MenuItem>
              <MenuItem value="standard">Standart</MenuItem>
              <MenuItem value="large">Büyük Oda</MenuItem>
            </Select>
          </FormControl>
          <TextField label="Fiyat" type="number" fullWidth margin="normal" value={currentRoomDetails.price} onChange={handlepriceChange} required />
          <TextField label="Oda Sayısı ve Numaraları (virgülle ayrılmış)" onChange={handleRoomNumberChange} fullWidth margin="normal" required />
          <FormControl fullWidth margin="normal" required>
            <InputLabel>Manzara Tipi</InputLabel>
            <Select multiple value={currentRoomDetails.viewType} onChange={handleViewTypeChange} renderValue={(selected) => selected.join(', ')} required>
              <MenuItem value="Deniz">
                <Checkbox checked={currentRoomDetails.viewType.indexOf('Deniz') > -1} />
                <ListItemText primary="Deniz" />
              </MenuItem>
              <MenuItem value="Orman">
                <Checkbox checked={currentRoomDetails.viewType.indexOf('Orman') > -1} />
                <ListItemText primary="Orman" />
              </MenuItem>
              <MenuItem value="Göl">
                <Checkbox checked={currentRoomDetails.viewType.indexOf('Göl') > -1} />
                <ListItemText primary="Göl" />
              </MenuItem>
              <MenuItem value="Havuz">
                <Checkbox checked={currentRoomDetails.viewType.indexOf('Havuz') > -1} />
                <ListItemText primary="Havuz" />
              </MenuItem>
            </Select>
          </FormControl>
          <h3>Oda Özellikleri</h3>
          {/* <TextField label="Yatak Sayısı" type="number" value={currentRoomDetails.roomAmenities.beds} onChange={(e) => setCurrentRoomDetails({ ...currentRoomDetails, roomAmenities: { ...currentRoomDetails.roomAmenities, beds: e.target.value } })} fullWidth margin="normal" required />
          <FormControlLabel control={<Switch checked={currentRoomDetails.roomAmenities.ac} onChange={handleRoomAmenityChange('ac')} />} label="Klima" />
          <FormControlLabel control={<Switch checked={currentRoomDetails.roomAmenities.minibar} onChange={handleRoomAmenityChange('minibar')} />} label="Mini Bar" />
          <FormControlLabel control={<Switch checked={currentRoomDetails.roomAmenities.balcony} onChange={handleRoomAmenityChange('balcony')} />} label="Balkon" />
          <FormControlLabel control={<Switch checked={currentRoomDetails.roomAmenities.jacuzzi} onChange={handleRoomAmenityChange('jacuzzi')} />} label="Jakuzi" /> */}

        </DialogContent>
        <DialogActions>
          <Button onClick={handleRoomSave} color="primary">Kaydet</Button>
          <Button onClick={handleModalRoomClose} color="secondary">İptal</Button>
        </DialogActions>
      </Dialog>

   
    </Box>
  );
};

export default Admin;