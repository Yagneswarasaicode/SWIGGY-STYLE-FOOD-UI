import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const SWIGGY_URL =
  "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.6244883&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING";

const RestaurantCard = ({ info }) => {
  const {
    id,
    name,
    cuisines,
    avgRating,
    sla,
    costForTwo,
    cloudinaryImageId,
    aggregatedDiscountInfoV3,
  } = info;

  const imgUrl = cloudinaryImageId
    ? `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/${cloudinaryImageId}`
    : `https://via.placeholder.com/508x320/fde8d4/e07b39?text=${encodeURIComponent(name)}`;

  const offer =
    aggregatedDiscountInfoV3?.header
      ? `${aggregatedDiscountInfoV3.header} ${aggregatedDiscountInfoV3.subHeader || ""}`.trim()
      : null;

  return (
    <Link to={`/restaurants/${id}`} className="card">
      <div className="card-img-wrap">
        <img src={imgUrl} alt={name} loading="lazy" />
        {offer && <span className="card-badge offer">{offer}</span>}
      </div>
      <div className="card-body">
        <div className="card-name">{name}</div>
        <div className="card-cuisine">
          {(cuisines || []).slice(0, 3).join(" · ")}
        </div>
        <div className="card-meta">
          <span className="card-rating">
            <span style={{ color: "#e07b39" }}>★</span>
            {avgRating || "—"}
          </span>
          <span className="card-dot" />
          <span className="card-time">{sla?.slaString || "30–40 mins"}</span>
          <span className="card-dot" />
          <span className="card-cost">{costForTwo || "₹300 for two"}</span>
        </div>
      </div>
    </Link>
  );
};

const ShimmerCard = () => (
  <div className="card" style={{ pointerEvents: "none" }}>
    <div className="card-img-wrap shimmer" style={{ height: 175 }} />
    <div className="card-body">
      <div className="shimmer" style={{ height: 20, width: "75%", marginBottom: 8 }} />
      <div className="shimmer" style={{ height: 12, width: "50%", marginBottom: 16 }} />
      <div style={{ display: "flex", gap: 8 }}>
        <div className="shimmer" style={{ height: 12, width: 40 }} />
        <div className="shimmer" style={{ height: 12, width: 60 }} />
        <div className="shimmer" style={{ height: 12, width: 80 }} />
      </div>
    </div>
  </div>
);

const Content = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch(SWIGGY_URL);
      const json = await res.json();
      const cards =
        json?.data?.cards ?? [];
      let list = [];
      for (const c of cards) {
        const r = c?.card?.card?.gridElements?.infoWithStyle?.restaurants;
        if (r) { list = r.map((x) => x.info); break; }
      }
      setRestaurants(list);
      setFiltered(list);
    } catch (e) {
      setError(true);
      // fallback mock data
      const mock = Array.from({ length: 8 }, (_, i) => ({
        id: `mock-${i}`,
        name: ["The Golden Fork", "Spice Symphony", "Urban Bites", "Café Lumière", "The Tandoor House", "Pasta Republic", "Sushi Garden", "Burger Boulevard"][i],
        cuisines: [["North Indian", "Mughlai"], ["South Indian", "Chinese"], ["Continental", "Fast Food"], ["Café", "Desserts"], ["North Indian", "Biryani"], ["Italian", "Pizza"], ["Japanese", "Asian"], ["American", "Burgers"]][i],
        avgRating: (3.8 + Math.random() * 1.2).toFixed(1),
        sla: { slaString: `${20 + i * 5}–${30 + i * 5} mins` },
        costForTwo: `₹${200 + i * 100} for two`,
        cloudinaryImageId: null,
      }));
      setRestaurants(mock);
      setFiltered(mock);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (val) => {
    setSearch(val);
    apply(val, activeFilter);
  };

  const handleFilter = (f) => {
    setActiveFilter(f);
    apply(search, f);
  };

  const apply = (q, f) => {
    let list = restaurants;
    if (q.trim()) {
      const lower = q.toLowerCase();
      list = list.filter(
        (r) =>
          r.name?.toLowerCase().includes(lower) ||
          r.cuisines?.some((c) => c.toLowerCase().includes(lower))
      );
    }
    if (f === "top") list = list.filter((r) => parseFloat(r.avgRating) >= 4.0);
    setFiltered(list);
  };

  return (
    <>
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-tag">🌟 Fresh picks, every day</div>
          <h1>
            Great food,<br />
            <em>delivered fast.</em>
          </h1>
          <p>
            Discover restaurants around you — from hidden gems to neighborhood
            favourites, all at your doorstep.
          </p>
        </div>
      </section>

      <div className="controls-bar">
        <div className="search-wrapper">
          <span className="search-icon">🔍</span>
          <input
            className="search-input"
            type="text"
            placeholder="Search restaurants or cuisines…"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        <button
          className={`filter-btn ${activeFilter === "all" ? "active" : ""}`}
          onClick={() => handleFilter("all")}
        >
          All
        </button>
        <button
          className={`filter-btn ${activeFilter === "top" ? "active" : ""}`}
          onClick={() => handleFilter("top")}
        >
          ⭐ Top Rated
        </button>
        {!loading && (
          <span className="results-count">
            {filtered.length} place{filtered.length !== 1 ? "s" : ""}
          </span>
        )}
      </div>

      <div className="section-header">
        <span className="section-title">
          {activeFilter === "top" ? "Top Rated Restaurants" : "All Restaurants"}
        </span>
      </div>

      <main className="content-box">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => <ShimmerCard key={i} />)
          : filtered.length === 0
          ? (
            <div className="empty-state">
              <h3>No results found</h3>
              <p>Try a different search or filter</p>
            </div>
          )
          : filtered.map((r) => <RestaurantCard key={r.id} info={r} />)
        }
      </main>
    </>
  );
};

export default Content;
