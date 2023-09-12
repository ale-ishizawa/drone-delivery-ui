import React, { useEffect, useState } from 'react';
import { Alert, AlertColor, Snackbar, TextField } from '@mui/material';
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
  const [jsonData, setJsonData] = useState<LoadJson.Model>({});
  const [isLoading, setIsLoading] = useState(false);
  const [lastDeliveries, setLastDeliveries] = useState([]);
  const [fastestRoute, setFastestRoute] = useState<string[]>([]);
  const [timeToDelivery, setTimeToDelivery] = useState(0);
  const [coordinates, setCoordinates] = useState({
    start: '',
    objectAt: '',
    destination: '',
  });
  const [showFeedback, setShowFeedback] = useState({
    message: '',
    open: false,
    severity: 'success' as AlertColor,
  });

  useEffect(() => {
    loadData();
    loadFromLocalStorage();
  }, []);

  const loadData = async () => {
    const response = await loadJson.load();
    setJsonData(response);
  };

  const saveToLocalStorage = (route: string[], time: number): void => {
    localStorage.setItem(
      'lastDeliveries',
      `From ${route[0]} to ${route[route.length - 1]} in ${time} seconds`
    );
  };

  const loadFromLocalStorage = (): void => {
    const savedDeliveries = localStorage.getItem('lastDeliveries');
  };

  const handleChangeCoordinates = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { value, name } = event.target;
    setCoordinates({
      ...coordinates,
      [name]: value.toLocaleUpperCase(),
    });
  };

  const closeFeedback = () => {
    setShowFeedback({
      ...showFeedback,
      open: false,
    });
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    const validInputs = Object.keys(jsonData);
    if (
      validInputs.includes(coordinates.destination) &&
      validInputs.includes(coordinates.start) &&
      validInputs.includes(coordinates.objectAt)
    ) {
      const yAxios = [1, 2, 3, 4, 5, 6, 7, 8];
      const xAxios = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

      //Start axis
      const startXAx = coordinates.start.slice(0, 1);
      const startYAx = parseInt(coordinates.start.slice(1, 2));

      //Object axis
      const objectXax = coordinates.objectAt.slice(0, 1);
      const objectYAx = parseInt(coordinates.objectAt.slice(1, 2));

      //Destination axis
      const destinationXax = coordinates.destination.slice(0, 1);
      const destinationYAx = parseInt(coordinates.destination.slice(1, 2));

      let routeKeysToObject: string[] = [coordinates.start];
      let routeKeysToDestination: string[] = [coordinates.objectAt];
      let timeToPickObject = 0;
      let currentPosition = {
        key: coordinates.start,
        value: 0,
      };

      const chooseNextMove = (alreadyWithObject: boolean): void => {
        let possibleMoves: Array<{ key: string; value: number }> = [];
        for (const [key, value] of Object.entries(
          jsonData[currentPosition.key]
        )) {
          const currentXAx = key.slice(0, 1);
          const currentYAx = parseInt(key.slice(1, 2));
          const lastPositionYAx = parseInt(
            alreadyWithObject
              ? routeKeysToDestination[routeKeysToDestination.length - 1].slice(
                  1,
                  2
                )
              : routeKeysToObject[routeKeysToObject.length - 1].slice(1, 2)
          );
          const lastPositionXAx = alreadyWithObject
            ? routeKeysToDestination[routeKeysToDestination.length - 1].slice(
                0,
                1
              )
            : routeKeysToObject[routeKeysToObject.length - 1].slice(0, 1);

          if (
            xAxios.indexOf(alreadyWithObject ? destinationXax : objectXax) <=
            xAxios.indexOf(alreadyWithObject ? objectXax : startXAx)
          ) {
            if (
              xAxios.indexOf(currentXAx) <=
                xAxios.indexOf(alreadyWithObject ? objectXax : startXAx) &&
              xAxios.indexOf(currentXAx) >=
                xAxios.indexOf(alreadyWithObject ? destinationXax : objectXax)
            ) {
              if (
                xAxios.indexOf(currentXAx) <= xAxios.indexOf(lastPositionXAx)
              ) {
                if (alreadyWithObject) {
                  if (key === coordinates.destination) {
                    possibleMoves = [
                      {
                        key,
                        value,
                      },
                    ];
                    continue;
                  }
                  if (destinationYAx <= objectYAx) {
                    if (currentYAx <= objectYAx) {
                      if (!routeKeysToDestination.includes(key)) {
                        possibleMoves.push({
                          key,
                          value,
                        });
                      }
                    }
                  } else if (currentYAx >= objectYAx) {
                    if (!routeKeysToDestination.includes(key)) {
                      possibleMoves.push({
                        key,
                        value,
                      });
                    }
                  }
                } else {
                  if (key === coordinates.objectAt) {
                    possibleMoves = [
                      {
                        key,
                        value,
                      },
                    ];
                    continue;
                  }
                  if (objectYAx <= startYAx) {
                    if (currentYAx <= startYAx) {
                      if (!routeKeysToObject.includes(key)) {
                        possibleMoves.push({
                          key,
                          value,
                        });
                      }
                    }
                  } else if (currentYAx >= startYAx) {
                    if (!routeKeysToObject.includes(key)) {
                      possibleMoves.push({
                        key,
                        value,
                      });
                    }
                  }
                }
              }
            }
          }

          if (
            xAxios.indexOf(alreadyWithObject ? destinationXax : objectXax) >=
            xAxios.indexOf(alreadyWithObject ? objectXax : startXAx)
          ) {
            if (
              xAxios.indexOf(currentXAx) >=
                xAxios.indexOf(alreadyWithObject ? objectXax : startXAx) &&
              xAxios.indexOf(currentXAx) <=
                xAxios.indexOf(alreadyWithObject ? destinationXax : objectXax)
            ) {
              if (
                xAxios.indexOf(currentXAx) >= xAxios.indexOf(lastPositionXAx)
              ) {
                if (alreadyWithObject) {
                  if (key === coordinates.destination) {
                    possibleMoves = [
                      {
                        key,
                        value,
                      },
                    ];

                    continue;
                  }

                  if (destinationYAx >= objectYAx) {
                    if (currentYAx >= objectYAx) {
                      if (!routeKeysToDestination.includes(key)) {
                        possibleMoves.push({
                          key,
                          value,
                        });
                      }
                    }
                  } else if (
                    currentYAx <= objectYAx &&
                    currentYAx <= lastPositionYAx
                  ) {
                    if (!routeKeysToDestination.includes(key)) {
                      possibleMoves.push({
                        key,
                        value,
                      });
                    }
                  }
                } else {
                  if (key === coordinates.objectAt) {
                    possibleMoves = [
                      {
                        key,
                        value,
                      },
                    ];
                    continue;
                  }
                  if (objectYAx >= startYAx) {
                    if (currentYAx >= startYAx) {
                      if (!routeKeysToObject.includes(key)) {
                        possibleMoves.push({
                          key,
                          value,
                        });
                      }
                    }
                  } else if (
                    currentYAx <= startYAx &&
                    currentYAx <= lastPositionYAx
                  ) {
                    if (!routeKeysToObject.includes(key)) {
                      possibleMoves.push({
                        key,
                        value,
                      });
                    }
                  }
                }
              }
            }
          }
        }
        currentPosition = possibleMoves.reduce((previousValue, currentValue) =>
          currentValue.value < previousValue.value
            ? currentValue
            : previousValue
        );

        if (alreadyWithObject) {
          routeKeysToDestination.push(currentPosition.key);
        } else {
          routeKeysToObject.push(currentPosition.key);
        }

        timeToPickObject += currentPosition.value;
      };

      while (currentPosition.key !== coordinates.objectAt) {
        chooseNextMove(false);
      }

      if (currentPosition.key === coordinates.objectAt) {
        while (currentPosition.key !== coordinates.destination) {
          chooseNextMove(true);
        }
      }

      routeKeysToDestination.shift();
      setFastestRoute([...routeKeysToObject, ...routeKeysToDestination]);
      setTimeToDelivery(timeToPickObject);
      saveToLocalStorage(
        [...routeKeysToObject, ...routeKeysToDestination],
        timeToPickObject
      );
    } else {
      setShowFeedback({
        message: 'Wrong coordinates! please try from A1 to H8',
        open: true,
        severity: 'warning',
      });
    }
  };

  return (
    <div className="wrap">
      <Header />
      <form data-testid="form" className="form" onSubmit={handleSubmit}>
        <h2>Input Coordinates</h2>
        <div className="inputs">
          <label>Drone Start:</label>
          <TextField
            variant="standard"
            name="start"
            value={coordinates.start}
            inputProps={{
              maxLength: 2,
            }}
            onChange={handleChangeCoordinates}
          />
        </div>
        <div className="inputs">
          <label>Object pick-up:</label>
          <TextField
            variant="standard"
            name="objectAt"
            value={coordinates.objectAt}
            inputProps={{
              maxLength: 2,
            }}
            onChange={handleChangeCoordinates}
          />
        </div>
        <div className="inputs">
          <label>Delivery destination:</label>
          <TextField
            variant="standard"
            inputProps={{
              maxLength: 2,
            }}
            onChange={handleChangeCoordinates}
            name="destination"
            value={coordinates.destination}
          />
        </div>

        <ColorButton type="submit" variant="contained">
          Calculate fastest route
        </ColorButton>
        <div style={{ maxWidth: '400px' }}>
          <p>
            The set delivery will have the route {fastestRoute.join('+')} and
            will take {timeToDelivery.toFixed(2)} seconds to be delivered as
            fast as possible.
          </p>
        </div>
      </form>
      <Footer />
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={showFeedback.open}
        autoHideDuration={6000}
        onClose={closeFeedback}
        key={'bottom' + 'center'}
      >
        <Alert
          onClose={closeFeedback}
          severity={showFeedback.severity}
          sx={{ width: '100%' }}
          variant="filled"
        >
          {showFeedback.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Home;
