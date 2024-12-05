'use client'

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  TextField, 
  Button, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia,
  CircularProgress,
  Alert,
  MenuItem
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const StyledForm = styled('form')(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(3),
  marginBottom: theme.spacing(4),
}));

const SearchResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useState({
    location: '',
    start_Date: null,
    end_Date: null,
    number_Of_People: '1',
  });

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    setSearchParams({
      location: queryParams.get('location') || '',
      start_Date: queryParams.get('start_Date') ? new Date(queryParams.get('start_Date')) : null,
      end_Date: queryParams.get('end_Date') ? new Date(queryParams.get('end_Date')) : null,
      number_Of_People: queryParams.get('number_Of_People') || '1',
    });
  }, [location.search]);

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const queryParams = new URLSearchParams({
        ...searchParams,
        start_Date: searchParams.start_Date?.toISOString().split('T')[0] || '',
        end_Date: searchParams.end_Date?.toISOString().split('T')[0] || '',
      });
      navigate(`/search-results?${queryParams.toString()}`);

      const response = await fetch(
        `https://localhost:7253/api/HotelService/search?${queryParams.toString()}`
      );
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Error fetching search results:', error);
      setError('An error occurred while fetching data.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#f5f5f5' }}>
        <Header />
        
        <Container maxWidth="lg" style={{ flexGrow: 1, paddingTop: '4rem', paddingBottom: '2rem' }}>
          <Typography variant="h3" component="h1" gutterBottom align="center">
            Search Results
          </Typography>
          
          <StyledForm onSubmit={handleSearchSubmit}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={2}>
                <TextField
                  fullWidth
                  label="Destination"
                  variant="outlined"
                  value={searchParams.location}
                  onChange={(e) => setSearchParams({ ...searchParams, location: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <DatePicker
                  label="Check-in Date"
                  value={searchParams.start_Date}
                  onChange={(date) => setSearchParams({ ...searchParams, start_Date: date })}
                  renderInput={(params) => <TextField {...params} fullWidth variant="outlined" />}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <DatePicker
                  label="Check-out Date"
                  value={searchParams.end_Date}
                  onChange={(date) => setSearchParams({ ...searchParams, end_Date: date })}
                  renderInput={(params) => <TextField {...params} fullWidth variant="outlined" />}
                />
              </Grid>
              <Grid item xs={12} md={2}>
                <TextField
                  fullWidth
                  select
                  label="Guests"
                  variant="outlined"
                  value={searchParams.number_Of_People}
                  onChange={(e) => setSearchParams({ ...searchParams, number_Of_People: e.target.value })}
                >
                  {[1, 2, 3, 4].map((num) => (
                    <MenuItem key={num} value={num.toString()}>
                      {num} {num === 1 ? 'Guest' : 'Guests'}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} md={2}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={loading}
                  style={{ height: '100%', padding:'1 rem'}}
                >
                  {loading ? <CircularProgress size={24} /> : 'Search'}
                </Button>
              </Grid>
            </Grid>
          </StyledForm>

          {error && (
            <Alert severity="error" style={{ marginBottom: '1rem' }}>
              {error}
            </Alert>
          )}

          {!loading && !error && results.length > 0 && (
            <Grid container spacing={3}>
              {results.map((result, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card>
                    <CardMedia
                      component="img"
                      height="140"
                      image={`https://source.unsplash.com/random/400x200?hotel,${index}`}
                      alt={result.serviceName}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {result.serviceName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {result.city}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Provider: {result.providerName}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}

          {!loading && !error && results.length === 0 && (
            <Typography variant="body1" align="center">
              No results found. Please try a new search.
            </Typography>
          )}
        </Container>

        <Footer />
      </div>
    </LocalizationProvider>
  );
};

export default SearchResultsPage;

