import EventCards from '@/components/EventsCard'
import config from '@/config/config'
import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'

export default function Events() {
    const events = config.data.agenda || []; // Pastikan agenda ada, jika tidak, gunakan array kosong

    return (
        <>
            {/* Event Section */}
            {events.length > 0 && ( // Hanya tampilkan jika ada event
                <section id="event" className="relative flex flex-col items-center justify-center px-4 py-16 sm:py-20 text-center overflow-hidden bg-cover bg-center"
                style={{ backgroundImage: "url('https://images.pexels.com/photos/1268877/pexels-photo-1268877.jpeg?cs=srgb&dl=pexels-asadphoto-1268877.jpg&fm=jpg')", backgroundAttachment: 'fixed' }}>
        
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative z-10 container mx-auto px-4 py-20"
                    >
                        {/* Section Header */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="text-center space-y-4 mb-16"
                        >
                            <motion.span
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="inline-block text-rose-500 font-medium mb-2"
                            >
                                Catat Tanggal Penting Ini
                            </motion.span>

                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 }}
                                className="text-4xl md:text-5xl font-serif text-gray-800 leading-tight"
                            >
                                Rangkaian Acara Pernikahan
                            </motion.h2>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.4 }}
                                className="text-gray-500 max-w-md mx-auto"
                            >
                                Kami Mengundang Anda untuk Merayakan Hari Istimewa Sebagai Awal Perjalanan Cinta Kami
                            </motion.p>

                            {/* Decorative Line */}
                            <motion.div
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.5 }}
                                className="flex items-center justify-center gap-4 mt-6"
                            >
                                <div className="h-[1px] w-12 bg-rose-200" />
                                <div className="text-rose-400">
                                    <Heart className="w-4 h-4" fill="currentColor" />
                                </div>
                                <div className="h-[1px] w-12 bg-rose-200" />
                            </motion.div>
                        </motion.div>

                        {/* Events Grid */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="max-w-2xl mx-auto"
                        >
                            <EventCards events={events} />
                        </motion.div>
                    </motion.div>
                </section>
            )}
        </>
    )
}
