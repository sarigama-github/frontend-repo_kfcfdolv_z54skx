export default function About(){
  return (
    <div className="mx-auto max-w-5xl px-4 py-14 space-y-10">
      <section>
        <h1 className="text-3xl font-extrabold">Story of Boskiing</h1>
        <p className="text-white/80 mt-3">BOSKIING lahir dari mimpi sederhana: menghadirkan fast food yang cepat, segar, dan terasa boss level. Kami memadukan resep rahasia, teknik modern, dan visual premium agar setiap momen makan jadi pengalaman yang memorable.</p>
      </section>
      <section className="grid md:grid-cols-2 gap-6">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <div className="font-bold mb-2">Filosofi Masakan</div>
          <p className="text-white/80">Keseimbangan rasa, tekstur, dan temperatur. Crunchy di luar, juicy di dalam. Semua diolah dengan standar dapur profesional.</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <div className="font-bold mb-2">Team & Kitchen</div>
          <p className="text-white/80">Tim dapur kami terlatih untuk konsistensi, kebersihan, dan ketepatan waktu. Setiap menu melewati quality check.</p>
        </div>
      </section>
      <section>
        <div className="font-extrabold text-2xl mb-4">Values</div>
        <ul className="grid sm:grid-cols-3 gap-4">
          <li className="bg-white/5 border border-white/10 rounded-2xl p-6">Fast</li>
          <li className="bg-white/5 border border-white/10 rounded-2xl p-6">Fresh</li>
          <li className="bg-white/5 border border-white/10 rounded-2xl p-6">Boss Level</li>
        </ul>
      </section>
    </div>
  )
}
