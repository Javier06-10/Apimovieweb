import { useEffect, useState } from "react";
import apimovie from "../../Apiaccess/apimovie";
import { Button, Image, Input, Pagination, Progress } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";

type PopularTvShows = {
  id: number;
  name: string;
  network: string;
  image_thumbnail_path: string;
  page: number;
  total: number;
  pages: number;
};

function getMostPopularTvShows(page: number) {
  return apimovie.get("/api/most-popular", { params: { page: page } });
}

function searchTvShows(query: string) {
  return apimovie.get("/api/search", { params: { q: query } });
}

function PopularTvShows() {
  const [page, setPage] = useState({
    page: 1,
    total: 20,
    pages: 20,
  });
  const [popularTvShows, setPopularTvShows] = useState<PopularTvShows[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    setLoading(true);
    if (searchQuery) {
      
      searchTvShows(searchQuery)
        .then((response) => {
          setPopularTvShows(response.data.tv_shows);
          setPage({
            page: response.data.page,
            total: response.data.total,
            pages: response.data.pages,
          });
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
        });
    } else {
      
      getMostPopularTvShows(page.page)
        .then((response) => {
          setPopularTvShows(response.data.tv_shows);
          setPage({
            page: response.data.page,
            total: response.data.total,
            pages: 20,
          });
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
        });
    }
  }, [page.page, searchQuery]);

  // Manejar la busqueda
  const handleSearch = (value: string) => {
    setSearchQuery(value); 
    setPage({ ...page, page: 1 }); 
  };



  return (
    
    <div> 
      
        <Input.Search 
          placeholder="Search TV Shows"
          style={{ maxWidth: "300px", marginLeft:"1000PX", alignContent:'center'}}
          onSearch={handleSearch} 
          enterButton
        /> 
    
      <h1 style={{ fontFamily: "cursive", fontSize: "20px", textAlign: "center" }}>
        {searchQuery ? `Search Results for "${searchQuery}"` : "Most Popular TV Shows"}
      </h1>
      <ul style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {loading && (
          <p>
            <Progress strokeLinecap="butt" type="circle" status="active" percent={100} />
          </p>
        )} 
        {popularTvShows.map((tvShow) => (
          <li
            key={tvShow.id}
            style={{
              listStyleType: "none",
              display: "flex",
              flexDirection: "column",
              border: "1px solid #ccc",
              borderRadius: "5px",
              height: "400px",
              width: "200px",
              marginRight: "10px",
              marginBottom: "10px",
            }}
          >
            <Image 
              preview={true}
              onClick={() => navigate(`/showdetails/${tvShow.id}`)}
              style={{ width: "200px", height: "300px" }}
              src={tvShow.image_thumbnail_path}
              alt={tvShow.name}
            />
            <h4 style={{ font: "2px", textAlign: "center", textOverflow: "ellipsis" }}>
              {tvShow.name}
            </h4>
            <p style={{ textAlign: "center" }}>{tvShow.network}</p>
          </li>
        ))}
      </ul>
      <Pagination
        style={{ justifyContent: "center" }}
        current={page.page}
        pageSize={page.pages}
        total={page.total}
        onChange={(newPage) => {
          setPage({ ...page, page: newPage });
        }}//pagination vacana 
      />
    </div>
  
  );
}

export default PopularTvShows;