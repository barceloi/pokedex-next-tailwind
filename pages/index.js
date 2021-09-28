import Head from "next/head";
import Image from "next/image";
import Layout from "../components/Layout.js";
import Link from "next/link";

export default function Home({ pokemon }) {
  return (
    <Layout title="El Pokedex">
      <h1 className="text-4xl mb-8 text-center">El Pokedex</h1>
      <ul>
        {pokemon.map((pokeman, index) => (
          <li key={index}>
            <Link href={`/pokemon?id=${index + 1}`}>
              <a>
                <img src={pokeman.image} alt={pokeman.name} />
                <span>{index + 1}. </span>
                {pokeman.name}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
}

export async function getStaticProps(context) {
  try {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=150");
    const { results } = await res.json();
    const pokemon = results.map((result, index) => {
      const paddedIndex = ("00" + (index + 1)).slice(-3);
      const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedIndex}.png`;
      return {
        ...result,
        image,
      };
    });
    return {
      props: { pokemon },
    };
  } catch (err) {
    console.error(err);
  }
}
