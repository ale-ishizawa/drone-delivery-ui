import React, { useEffect, useState } from 'react';
import { TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import Footer from '../../components/footer';
import Header from '../../components/Header';
import Button, { ButtonProps } from '@mui/material/Button';
import { LoadJson } from '../../domain/usecases/load-json';
import './styles.scss';

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.getContrastText('#0e4988'),
  backgroundColor: '#0e4988',
  '&:hover': {
    backgroundColor: '#0e6d88',
  },
}));

interface HomeProps {
  loadJson: LoadJson;
}

function Home({ loadJson }: HomeProps): JSX.Element {
  const [jsonData, setJsonData] = useState<LoadJson.Model[]>([]);

  const loadData = async () => {
    const response = await loadJson.load();
    setJsonData(response);
    console.log('Response: ', jsonData);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="wrap">
      <Header />
      <form data-testid="form" className="form">
        <h2>Input Coordinates</h2>
        <div className="inputs">
          <label>Drone Start:</label>
          <TextField
            variant="standard"
            inputProps={{
              maxLength: 2,
            }}
          />
        </div>
        <div className="inputs">
          <label>Object pick-up:</label>
          <TextField
            variant="standard"
            inputProps={{
              maxLength: 2,
            }}
          />
        </div>
        <div className="inputs">
          <label>Delivery destination:</label>
          <TextField
            variant="standard"
            inputProps={{
              maxLength: 2,
            }}
          />
        </div>

        <ColorButton variant="contained">Calculate fastest route</ColorButton>
      </form>
      <Footer />
    </div>
  );
}

export default Home;
