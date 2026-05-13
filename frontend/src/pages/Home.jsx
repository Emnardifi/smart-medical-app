import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import {
  Brain,
  FileText,
  Activity,
  ShieldCheck,
} from "lucide-react"

import HomeNavbar from "../components/layout/HomeNavbar"
import Footer from "../components/layout/Footer"

import image1 from "../assets/homeimage1.jpg"
import image2 from "../assets/homeimage2.jpg"
import image3 from "../assets/homeimage3.jpg"

const features = [
  {
    icon: <Activity size={34} />,
    title: "Analyse X-ray",
    text: "Upload d’une radiographie pulmonaire et prédiction automatique.",
  },
  {
    icon: <Brain size={34} />,
    title: "IA + Grad-CAM",
    text: "Visualisation des zones importantes détectées par le modèle.",
  },
  {
    icon: <FileText size={34} />,
    title: "Rapport PDF",
    text: "Génération automatique d’un rapport médical structuré.",
  },
]

const images = [image1, image2, image3]

const Home = () => {
  const [currentImage, setCurrentImage] = useState(0)

  // Changement automatique image
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) =>
        (prev + 1) % images.length
      )
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-[#eef6ff] text-gray-900 overflow-hidden">
      <HomeNavbar />

      {/* HERO */}
      <section className="relative min-h-screen pt-28 overflow-hidden">
        
        {/* Background blur */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300 rounded-full blur-3xl opacity-40"></div>

        <div className="absolute bottom-10 right-10 w-80 h-80 bg-green-300 rounded-full blur-3xl opacity-40"></div>

        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-14 items-center min-h-[85vh] relative z-10">
          
          {/* LEFT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: -70 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block mb-5 px-5 py-2 rounded-full bg-white/70 backdrop-blur-xl text-green-700 font-semibold shadow">
              AI Medical Assistant
            </span>

            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
              Détection intelligente de la{" "}
              <span className="text-blue-600">
                pneumonie
              </span>
            </h1>

            <p className="text-lg text-gray-600 mb-8 max-w-xl">
              Smart Medical App analyse les radiographies pulmonaires,
              affiche le résultat IA, génère une heatmap
              Grad-CAM et produit un rapport PDF médical.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/register"
                className="px-8 py-3 bg-blue-600 text-white rounded-2xl font-semibold hover:bg-blue-700 shadow-xl transition"
              >
                Commencer
              </Link>

              <Link
                to="/login"
                className="px-8 py-3 bg-white/70 backdrop-blur-xl border border-white text-blue-600 rounded-2xl font-semibold hover:bg-white shadow transition"
              >
                Se connecter
              </Link>
            </div>
          </motion.div>

          {/* RIGHT IMAGE */}
          <motion.div
            className="relative"
            initial={{
              opacity: 0,
              scale: 0.8,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
          >
            <motion.div
              animate={{
                y: [0, -15, 0],
                rotateY: [0, 4, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 5,
              }}
              className="relative bg-white/70 backdrop-blur-2xl rounded-[2rem] shadow-2xl p-5 border border-white"
            >
              {/* AUTO IMAGE SLIDER */}
              <div className="relative overflow-hidden rounded-[1.5rem]">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentImage}
                    src={images[currentImage]}
                    alt="Medical AI"
                    initial={{
                      opacity: 0,
                      scale: 1.08,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.95,
                    }}
                    transition={{
                      duration: 0.7,
                    }}
                    className="rounded-[1.5rem] w-full h-[430px] object-cover"
                  />
                </AnimatePresence>

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/40 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm">
                  Images automatiques
                </div>
              </div>

              {/* Floating card */}
              <div className="absolute -top-6 -right-6 bg-white/80 backdrop-blur-xl shadow-2xl rounded-2xl p-5 border border-white">
                <p className="text-sm text-gray-500">
                  Analyse
                </p>

                <h3 className="text-xl font-bold text-blue-600">
                  IA Active
                </h3>
              </div>

              <div className="absolute -bottom-8 -left-8 bg-white/80 backdrop-blur-xl shadow-2xl rounded-2xl p-5 border border-white">
                <p className="text-sm text-gray-500">
                  Résultat IA
                </p>

                <h3 className="text-2xl font-bold text-green-600">
                  NORMAL
                </h3>

                <p className="text-sm text-gray-500">
                  Probabilité : 94%
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-14">
            Fonctionnalités principales
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{
                  y: -10,
                  rotateX: 5,
                  rotateY: -5,
                  scale: 1.03,
                }}
                className="p-8 rounded-[2rem] bg-gradient-to-br from-blue-50 to-green-50 shadow-xl"
              >
                <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-blue-600 text-white mb-5">
                  {feature.icon}
                </div>

                <h3 className="text-xl font-bold mb-3">
                  {feature.title}
                </h3>

                <p className="text-gray-600">
                  {feature.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-green-500 text-white">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <ShieldCheck
            size={60}
            className="mx-auto mb-6"
          />

          <h2 className="text-4xl font-bold mb-5">
            Une solution moderne pour le diagnostic
          </h2>

          <p className="text-lg opacity-90 mb-8">
            Intelligence artificielle, heatmap
            explicable, rapport PDF et suivi
            médical intelligent.
          </p>

          <Link
            to="/register"
            className="inline-block px-8 py-3 bg-white text-blue-600 rounded-2xl font-bold hover:bg-gray-100 transition"
          >
            Tester l’application
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Home