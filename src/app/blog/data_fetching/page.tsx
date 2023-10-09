import Link from "next/link";

// TS way
// もっとあるけど、面倒なのでこんだけ
type Product = {
  id: number;
  title: string;
  price: number;
};

const getTimeDate = async () => {
  const res = await fetch(
    "http://worldtimeapi.org/api/timezone/America/Argentina/Salta",
    {
      next: {
        revalidate: 3, // wait for 3 sec
      },
    },
  );
  const data = await res.json();
  console.log(data);
  return data.datetime;
};

const SetInterval_in_react = async () => {
  const res = await fetch("https://dummyjson.com/products");
  const data = await res.json();

  const time = getTimeDate();

  return (
    <div className="p-10">
      <h1>Time: {time}</h1>
      <h2>Data fetching from dummyjson.com. everyone's favorite...</h2>
      {/* <p className="py-5">{JSON.stringify(data.products)}</p> */}

      <div>
        {data.products.map((el: Product, i: number) => (
          <div key={el.id}>
            <p>
              {i + 1} {el.title} ${el.price}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SetInterval_in_react;
