import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const RestaurantMenu = () => {
  const { resId } = useParams();
  const navigate = useNavigate();
  const [info, setInfo] = useState(null);
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMenu();
  }, [resId]);

  const fetchMenu = async () => {
    try {
      const res = await fetch(
        `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.9351929&lng=77.6244883&restaurantId=${resId}`
      );
      const json = await res.json();
      const cards = json?.data?.cards ?? [];

      // restaurant info
      const infoCard = cards.find(
        (c) => c?.card?.card?.["@type"]?.includes("restaurant.Restaurant")
      );
      setInfo(infoCard?.card?.card?.info || null);

      // menu items
      const itemsCard = cards.find((c) => c?.groupedCard);
      const cats =
        itemsCard?.groupedCard?.cardGroupMap?.REGULAR?.cards ?? [];
      const items = [];
      for (const cat of cats) {
        const title = cat?.card?.card?.title;
        const dishes =
          cat?.card?.card?.itemCards?.map((x) => x.card?.info) ?? [];
        if (dishes.length) items.push({ title, dishes });
      }
      setMenu(items);
    } catch (e) {
      // fallback mock menu
      setInfo({
        name: "Restaurant",
        cuisines: ["Multi Cuisine"],
        avgRating: "4.2",
        sla: { slaString: "30–40 mins" },
        costForTwoMessage: "₹400 for two",
      });
      setMenu([
        {
          title: "Starters",
          dishes: [
            { id: "1", name: "Paneer Tikka", description: "Marinated cottage cheese grilled in tandoor", price: 28000 },
            { id: "2", name: "Chicken Wings", description: "Crispy wings tossed in smoky sauce", price: 32000 },
          ],
        },
        {
          title: "Mains",
          dishes: [
            { id: "3", name: "Dal Makhani", description: "Slow-cooked black lentils in a rich tomato-butter sauce", price: 24000 },
            { id: "4", name: "Butter Chicken", description: "Tender chicken in a velvety tomato-cream gravy", price: 34000 },
            { id: "5", name: "Paneer Butter Masala", description: "Cottage cheese in a rich, spiced gravy", price: 28000 },
          ],
        },
        {
          title: "Desserts",
          dishes: [
            { id: "6", name: "Gulab Jamun", description: "Soft milk dumplings soaked in rose-cardamom syrup", price: 12000 },
            { id: "7", name: "Kulfi", description: "Traditional Indian ice cream with pistachio", price: 14000 },
          ],
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (p) =>
    p ? `₹${(p / 100).toFixed(0)}` : "";

  if (loading) {
    return (
      <div className="menu-page">
        <div className="menu-loading">Loading menu…</div>
      </div>
    );
  }

  return (
    <div className="menu-page">
      <button className="menu-back" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="menu-restaurant-header">
        <div>
          <div className="cuisine-tag">
            {(info?.cuisines || []).slice(0, 3).join(" · ")}
          </div>
          <h1>{info?.name || "Restaurant"}</h1>
        </div>
        <div className="menu-stats">
          <div className="menu-stat">
            <div className="val">★ {info?.avgRating || "—"}</div>
            <div className="lbl">Rating</div>
          </div>
          <div className="menu-stat">
            <div className="val">{info?.sla?.slaString || "—"}</div>
            <div className="lbl">Delivery</div>
          </div>
          <div className="menu-stat">
            <div className="val">{info?.costForTwoMessage?.replace(" for two", "") || "—"}</div>
            <div className="lbl">For two</div>
          </div>
        </div>
      </div>

      {menu.map((section) => (
        <div key={section.title} style={{ marginBottom: 40 }}>
          <div className="menu-section-title">{section.title}</div>
          <div className="menu-items">
            {section.dishes.map((dish) => (
              <div key={dish.id} className="menu-item">
                <div>
                  <div className="menu-item-name">{dish.name}</div>
                  {dish.description && (
                    <div className="menu-item-desc">{dish.description}</div>
                  )}
                </div>
                <div className="menu-item-right">
                  <div className="menu-item-price">
                    {formatPrice(dish.price || dish.defaultPrice)}
                  </div>
                  <button className="add-btn">+ Add</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RestaurantMenu;
