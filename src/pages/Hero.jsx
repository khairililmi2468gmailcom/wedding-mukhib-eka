import { Calendar, Clock, Heart } from 'lucide-react'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react';
import config from '@/config/config';
import { formatEventDate } from '@/lib/formatEventDate';
import { safeBase64 } from '@/lib/base64';

export default function Hero() {
    const [guestName, setGuestName] = useState('');
    const [croppedSrc, setCroppedSrc] = useState("");

    useEffect(() => {
        Jimp.read("/images/foto_nobg.png")
            .then(img => {
                return img.crop(0, 600, img.bitmap.width, img.bitmap.height - 580) // Crop atas 30px
                    .getBase64Async(Jimp.MIME_PNG);
            })
            .then(croppedImg => {
                setCroppedSrc(croppedImg);
            })
            .catch(err => console.error("Error cropping image:", err));
    }, []);
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const guestParam = urlParams.get('guest');

        if (guestParam) {
            try {
                const decodedName = safeBase64.decode(guestParam);
                setGuestName(decodedName);
            } catch (error) {
                console.error('Error decoding guest name:', error);
                setGuestName('');
            }
        }
    }, []);

    const CountdownTimer = ({ targetDate }) => {
        const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
        function calculateTimeLeft() {
            const difference = +new Date(targetDate) - +new Date();
            let timeLeft = {};

            if (difference > 0) {
                timeLeft = {
                    hari: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    jam: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    menit: Math.floor((difference / 1000 / 60) % 60),
                    detik: Math.floor((difference / 1000) % 60),
                };
            }
            return timeLeft;
        }
        useEffect(() => {
            const timer = setInterval(() => {
                setTimeLeft(calculateTimeLeft());
            }, 1000);
            return () => clearInterval(timer);
        }, [targetDate]);

        return (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
                {Object.keys(timeLeft).map((interval) => (
                    <motion.div
                        key={interval}
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="flex flex-col items-center p-3 bg-white/80 backdrop-blur-sm rounded-xl border border-rose-100"
                    >
                        <span className="text-xl sm:text-2xl font-bold text-rose-600">
                            {timeLeft[interval]}
                        </span>
                        <span className="text-xs text-gray-500 capitalize">{interval}</span>
                    </motion.div>
                ))}
            </div>
        );
    };

    const FloatingHearts = () => {
        return (
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(8)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{
                            opacity: 0,
                            scale: 0,
                            x: Math.random() * window.innerWidth,
                            y: window.innerHeight
                        }}
                        animate={{
                            opacity: [0, 1, 1, 0],
                            scale: [0, 1, 1, 0.5],
                            x: Math.random() * window.innerWidth,
                            y: -100
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            delay: i * 0.8,
                            ease: "easeOut"
                        }}
                        className="absolute"
                    >
                        <Heart
                            className={`w-${Math.floor(Math.random() * 2) + 8} h-${Math.floor(Math.random() * 2) + 8} ${i % 3 === 0 ? 'text-rose-400' :
                                i % 3 === 1 ? 'text-pink-400' :
                                    'text-red-400'
                                }`}
                            fill="currentColor"
                        />
                    </motion.div>
                ))}
            </div>
        );
    };

    return (
        <>
            <section
                id="home"
                className="relative flex flex-col items-center justify-center px-4 py-16 sm:py-20 text-center overflow-hidden bg-cover bg-center"
                style={{ backgroundImage: "url('https://images.pexels.com/photos/1268877/pexels-photo-1268877.jpeg?cs=srgb&dl=pexels-asadphoto-1268877.jpg&fm=jpg')", backgroundAttachment: 'fixed' }}
            >
                
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="space-y-6 relative z-10"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="inline-block mx-auto"
                    >
                        <span className="px-4 py-1 text-sm bg-rose-50 text-rose-600 rounded-full border border-rose-200">
                            Catat Tanggal Penting Ini
                        </span>
                    </motion.div>

                    <div className="space-y-2">
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="text-gray-500 font-light italic text-base sm:text-lg"
                        >
                            InsyaAllah Kami Akan Melaksanakan Resepsi Pernikahan
                        </motion.p>
                        <div className="flex justify-center items-center py-4">
                            <div className="w-48 h-36 sm:w-56 sm:h-56 rounded-full overflow-hidden border-4 border-rose-400 shadow-lg">
                                <img
                                    src="/images/foto_nobg.png"
                                    alt="Foto Resepsi"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>

                        <motion.h2
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="text-2xl sm:text-2xl font-serif bg-clip-text text-transparent bg-gradient-to-r from-rose-600 to-pink-600"
                        >
                            <h2 className="text-3xl sm:text-4xl font-bold font-serif bg-gradient-to-r from-rose-500  to-pink-500 text-transparent bg-clip-text drop-shadow-lg">
                                {config.data.groomName} & {config.data.brideName}
                            </h2>
                        </motion.h2>
                    </div>

                    <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
                        className="relative max-w-md mx-auto"
                    >
                        {/* Background Blur */}
                        <div className="absolute inset-0 bg-gradient-to-b from-rose-50/50 to-white/50 backdrop-blur-md rounded-2xl" />

                        <div className="relative px-6 sm:px-10 py-10 sm:py-12 rounded-2xl border border-rose-200 shadow-lg">

                            {/* Garis Atas */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-px">
                                <div className="w-24 sm:w-36 h-[2px] bg-gradient-to-r from-transparent via-rose-300 to-transparent" />
                            </div>

                            {/* Konten Tengah */}
                            <div className="space-y-4 text-center font-['Playfair Display']">

                                {/* Tanggal & Waktu */}
                                <div className="space-y-4">
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.9 }}
                                        className="flex items-center justify-center space-x-3"
                                    >
                                        <Calendar className="w-6 h-6 text-rose-500" />
                                        <span className="text-gray-800 font-semibold text-lg sm:text-xl">
                                            {formatEventDate(config.data.date, "full")}
                                        </span>
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 1 }}
                                        className="flex items-center justify-center space-x-3"
                                    >
                                        <Clock className="w-6 h-6 text-rose-500" />
                                        <span className="text-gray-800 font-semibold text-lg sm:text-xl">
                                            {config.data.time}
                                        </span>
                                    </motion.div>
                                </div>

                                {/* Hiasan Tengah */}
                                <div className="flex items-center justify-center gap-4">
                                    <div className="h-px w-10 sm:w-14 bg-rose-300/50" />
                                    <div className="w-3 h-2 rounded-full bg-rose-400" />
                                    <div className="h-px w-10 sm:w-14 bg-rose-300/50" />
                                </div>

                                {/* Ucapan Undangan */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 1.1 }}
                                    className="space-y-3"
                                >
                                    <p className="text-gray-500 font-serif italic text-lg">
                                        Kepada Yth.
                                    </p>
                                    <p className="text-gray-700 font-medium text-lg">
                                        Bapak/Ibu/Saudara/i
                                    </p>
                                    <p className="text-rose-600 font-semibold text-2xl">
                                        {guestName ? guestName : "Hadirin yang Kami Muliakan"}
                                    </p>
                                </motion.div>
                            </div>

                            {/* Garis Bawah */}
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-px">
                                <div className="w-24 sm:w-36 h-[2px] bg-gradient-to-r from-transparent via-rose-300 to-transparent" />
                            </div>
                        </div>

                        {/* Hiasan Latar */}
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 1.2, duration: 0.5 }}
                            className="absolute -top-2 -right-2 w-20 sm:w-28 h-20 sm:h-28 bg-rose-100/30 rounded-full blur-2xl"
                        />
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 1.3, duration: 0.5 }}
                            className="absolute -bottom-2 -left-2 w-20 sm:w-28 h-20 sm:h-28 bg-rose-100/30 rounded-full blur-2xl"
                        />
                    </motion.div>


                    <CountdownTimer targetDate={config.data.date} />

                    <div className="pt-6 relative">
                        <FloatingHearts />
                        <motion.div
                            animate={{
                                scale: [1, 1.1, 1],
                                rotate: [0, 5, -5, 0]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        >
                            <Heart className="w-10 sm:w-12 h-10 sm:h-12 text-rose-500 mx-auto" fill="currentColor" />
                        </motion.div>
                    </div>

                </motion.div>
            </section>
        </>
    )
}
