import React, { useCallback, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import client from '../../Apiaccess/apimovie';
import { Dropdown, Menu, Card, List, Typography, Button, Progress, Carousel, Switch } from 'antd';
import { ArrowLeftOutlined, DownOutlined } from '@ant-design/icons';


const { Title, Paragraph, Text } = Typography;

// Define las interfaces
interface Episode {
  season: number;
  episode: number;
  name: string;
  air_date: string;
}

interface TvShow {
  id: number;
  name: string;
  permalink: string;
  url: string;
  description: string;
  description_source: string;
  start_date: string;
  end_date: string | null;
  country: string;
  status: string;
  runtime: number;
  network: string;
  youtube_link: string | null;
  image_path: string;
  image_thumbnail_path: string;
  rating: string;
  rating_count: number;
  countdown: null;
  genres: string[];
  pictures: string[];
  episodes: Episode[];
}

interface ApiResponse {
  tvShow: TvShow;
}

const MovieDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Obtén el id de la URL
  const navigate = useNavigate();
  const [tvShow, setTvShow] = useState<TvShow | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSeason, setSelectedSeason] = useState<number | null>(null);
  const [ellipsis, setEllipsis] = useState(true);


  useEffect(() => {
    client.get<ApiResponse>(`/api/show-details?q=${id}`) 
      .then(response => {
        console.log("Respuesta de la API:", response); 
        setTvShow(response.data.tvShow); 
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching TV show details:', error);
        if (error.response && error.response.status === 404) {
          setError("La serie no fue encontrada.");
        } else {
          setError("Ocurrió un error al cargar los detalles de la serie.");
        }
        setLoading(false);
      });
  }, [id]);

  // Obtener las temporadas únicas
  const seasons = tvShow
    ? Array.from(new Set(tvShow.episodes.map(episode => episode.season)))
    : [];

  // Filtrar episodios por temporada seleccionada
  const filteredEpisodes = tvShow
    ? tvShow.episodes.filter(episode => episode.season === selectedSeason)
    : [];

  // Menú para el Dropdown de temporadas
  const seasonMenu = (
    <Menu onClick={({ key }) => setSelectedSeason(Number(key))}>
      {seasons.map(season => (
        <Menu.Item key={season}>Temporada {season}</Menu.Item>
      ))}
    </Menu>
  );

  if (loading) {
    return loading ? <p><Progress strokeLinecap="butt" type="circle" status="active" percent={100} /></p> : null; 
  }

  if (error) {
    return <div>Error: {error}</div>; 
  }

  if (!tvShow) {
    return <div>No se encontraron detalles de la serie.</div>; 
  }

  return (
   
   <><Button icon={<ArrowLeftOutlined />} color='primary' variant='solid'  onClick={() => navigate("/populartvshows")}>Back </Button>
    <Title style={{textAlign:'center'}} level={1}>{tvShow.name}</Title>
    
    <div style={{ paddingTop: '20px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      

      <>
      
      <Carousel autoplay style={{ color: '#000', border: '1px solid #d9d9d9', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',background:'black', width:'600px', height:'450px', marginTop:'10px' }} >
      {tvShow.pictures.map((picture, index) => (
        <img key={index} src={picture} alt={tvShow.name} style={{ width: '100%' }} />
      ))}
    </Carousel>
    
    </>

      <Card style={{ borderRadius: '10px' , boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' , backgroundColor: '#f0f2f5', color: '#000', border: '1px solid #d9d9d9', width: '50%' }}>
        <Paragraph ellipsis={ellipsis ? { rows: 2, expandable: true, symbol: 'more' } : false}>{tvShow.description}</Paragraph>
        <Paragraph>
          <Text strong>Fecha de inicio:</Text> {tvShow.start_date}
        </Paragraph>
        <Paragraph>
          <Text strong>Estado:</Text> {tvShow.status}
        </Paragraph>
        <Paragraph>
          <Text strong>Géneros:</Text> {tvShow.genres.join(', ')}
        </Paragraph>
        <Paragraph>
          <Text strong>Calificación:</Text> {tvShow.rating}
        </Paragraph>
        <Paragraph>
          <Text strong>Red:</Text> {tvShow.network}
          </Paragraph>
        <Paragraph>
          <Text strong>País:</Text> {tvShow.country}
          </Paragraph>
        <Paragraph>
          <Text strong>Duración:</Text> {tvShow.runtime} minutos
          </Paragraph>
        <Paragraph>
          <Text strong>Enlace de YouTube:</Text> {tvShow.youtube_link ? <a href={tvShow.youtube_link} target="_blank" rel="noopener noreferrer">Ver trailer</a> : 'No disponible'}
        </Paragraph>
      </Card>
    </div>
    <Card style={{ marginTop: '20px', borderRadius: '10px' , boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' , backgroundColor: '#f0f2f5', color: '#000', border: '1px solid #d9d9d9', width: '100%', }}>
      <Title level={3}>Episodios</Title>
      <Dropdown overlay={seasonMenu}>
        <Button>
          {selectedSeason ? `Temporada ${selectedSeason}` : 'Seleccionar temporada'} <DownOutlined />
        </Button>
      </Dropdown>
      <List
        itemLayout="horizontal"
        dataSource={filteredEpisodes}
        renderItem={episode => (
          <List.Item>
            <List.Item.Meta
              title={`S${episode.season} E${episode.episode} - ${episode.name}`}
              description={episode.air_date}
            />
          </List.Item>
        )}
      />
    </Card>
    </>
    
  );
  
};

export default MovieDetail;