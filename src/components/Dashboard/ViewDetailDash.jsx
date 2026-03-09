const ViewdetailDash = () => {
  const stats = [
    { name: "Dogs", count: 30, img: "/image/Dog/Dog.jpg" },
    { name: "Cats", count: 18, img: "/image/Dog/Cat.jpg" },
    { name: "Birds", count: 10, img: "/image/Dog/bird.png" },
    { name: "Fish", count: 25, img: "/image/Dog/Fish.jpg" },
    { name: "Small Pets", count: 12, img: "/image/Dog/smallPet.png" },
  ];

  return (
    <div className="p-4">
      <p className="text-black font-bold text-2xl mb-4">Products Store</p>

      {/* 3 columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow p-3 flex items-center gap-3 hover:shadow-lg duration-200"
          >
            {/* LEFT IMAGE */}
            <img
              src={item.img}
              alt={item.name}
              className="w-20 h-20 object-cover rounded-lg"
            />

            {/* RIGHT CONTENT */}
            <div>
              <p className="text-xl font-bold text-black">{item.name}</p>
              <p className="text-gray-600">Items: {item.count}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewdetailDash;
