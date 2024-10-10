import React from 'react';
import { List, ListItem, ListItemText, Divider } from '@mui/material';

const MyReservations = ({ reservations }) => {
  return (
    <List>
      {reservations.map((reservation, index) => (
        <React.Fragment key={index}>
          <ListItem alignItems="flex-start">
            <ListItemText
              primary={reservation.name}
              secondary={
                <>
                  <span>{reservation.location}</span>
                  <br />
                  <span>{reservation.nights} nights</span>
                  <br />
                  <span>${reservation.price}</span>
                </>
              }
            />
          </ListItem>
          {index < reservations.length - 1 && <Divider />}
        </React.Fragment>
      ))}
    </List>
  );
};

export default MyReservations;
