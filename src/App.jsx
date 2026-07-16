import React, { useState, useEffect } from 'react';
import { 
  Calendar, UserCheck, UserX, Home, School, BookOpen, Save, CheckCircle2, 
  Printer, Search, BookOpenCheck, AlertCircle, Plus, Trash2, X, FileText, Award, User, Lock 
} from 'lucide-react';

const alumnosIniciales = [
  { id: 1, nombre: 'Carmona Hilario Dayra Nahomi', asistencia: true, lugar: 'salon', tarea: true, canal: 'Visual', diagnostico: 'Aprende mejor con ejemplos visuales y colores.', incidentes: [] },
  { id: 2, nombre: 'Burgos Mancilla Franco', asistencia: true, lugar: 'salon', tarea: true, canal: 'Kinestésico', diagnostico: 'Disfruta el aprendizaje práctico y dinámico.', incidentes: [] },
  { id: 3, nombre: 'Calixto Daza Jose Guadalupe', asistencia: true, lugar: 'salon', tarea: true, canal: 'Auditivo', diagnostico: 'Participa activamente al escuchar explicaciones.', incidentes: [] },
  { id: 4, nombre: 'Castillo Valle Erick Alberto', asistencia: true, lugar: 'salon', tarea: true, canal: 'Visual', diagnostico: 'Buena retención de textos anotados en el pizarrón.', incidentes: [] },
  { id: 5, nombre: 'Dominguez Navarro Jose Alexander', asistencia: true, lugar: 'salon', tarea: true, canal: 'Kinestésico', diagnostico: 'Requiere manipulación de materiales para concentrarse.', incidentes: [] },
  { id: 6, nombre: 'Gonzalez Barrera Andrew Dennis', asistencia: true, lugar: 'salon', tarea: true, canal: 'Auditivo', diagnostico: 'Aprende muy bien a través del diálogo en clase.', incidentes: [] },
  { id: 7, nombre: 'Hernandez Benitez Naomi', asistencia: true, lugar: 'salon', tarea: true, canal: 'Visual', diagnostico: 'Organiza excelentemente sus apuntes y esquemas.', incidentes: [] },
  { id: 8, nombre: 'Hernandez Valencia Fernando Martin', asistencia: true, lugar: 'salon', tarea: true, canal: 'Kinestésico', diagnostico: 'Necesita dinamismo y pausas activas en la clase.', incidentes: [] },
  { id: 9, nombre: 'Jimenez Aguilera Ashley Michelle', asistencia: true, lugar: 'salon', tarea: true, canal: 'Visual', diagnostico: 'Se apoya mucho en mapas mentales e ilustraciones.', incidentes: [] },
  { id: 10, nombre: 'Luviano Jimenez Said', asistencia: true, lugar: 'salon', tarea: true, canal: 'Auditivo', diagnostico: 'Comprende muy bien las instrucciones orales complejas.', incidentes: [] },
  { id: 11, nombre: 'Luviano Salgado Iker', asistencia: true, lugar: 'salon', tarea: true, canal: 'Visual', diagnostico: 'Destaca en actividades de lectura silenciosa.', incidentes: [] },
  { id: 12, nombre: 'Montor Leon Arlet Berenice', asistencia: true, lugar: 'salon', tarea: true, canal: 'Kinestésico', diagnostico: 'Le gusta el trabajo en equipo y estar en movimiento.', incidentes: [] },
  { id: 13, nombre: 'Peña Molina Dulce Yamilet', asistencia: true, lugar: 'salon', tarea: true, canal: 'Auditivo', diagnostico: 'Muy atenta a las participaciones grupales.', incidentes: [] },
  { id: 14, nombre: 'Perez Pedroza Dara Betsabe', asistencia: true, lugar: 'salon', tarea: true, canal: 'Visual', diagnostico: 'Muy receptiva a organizadores gráficos.', incidentes: [] },
  { id: 15, nombre: 'Rabadan Orrosquieta Jesus Enrique', asistencia: true, lugar: 'salon', tarea: true, canal: 'Kinestésico', diagnostico: 'Aprende rápido a través del juego y retos físicos.', incidentes: [] },
  { id: 16, nombre: 'Sanchez Vega Orquidia', asistencia: true, lugar: 'salon', tarea: true, canal: 'Auditivo', diagnostico: 'Capta rápido los temas en charlas y debates.', incidentes: [] },
  { id: 17, nombre: 'Saucedo Espinoza Alvaro Santiago', asistencia: true, lugar: 'salon', tarea: true, canal: 'Visual', diagnostico: 'Trabaja de forma muy ordenada en su libreta.', incidentes: [] },
  { id: 18, nombre: 'Toribio Herrera Eleazar', asistencia: true, lugar: 'salon', tarea: true, canal: 'Kinestésico', diagnostico: 'Excelente coordinación motriz en las actividades.', incidentes: [] },
  { id: 19, nombre: 'Torres Aguilera Kathia Paloma', asistencia: true, lugar: 'salon', tarea: true, canal: 'Visual', diagnostico: 'Facilidad para aprender mediante la observación directa.', incidentes: [] },
  { id: 20, nombre: 'Zavaleta Orrostieta Elia Sofia', asistencia: true, lugar: 'salon', tarea: true, canal: 'Visual', diagnostico: 'Comprende fácilmente lecturas de texto.', incidentes: [] },
  { id: 21, nombre: 'Lopez Venegas Rosalia', asistencia: true, lugar: 'salon', tarea: true, canal: 'Kinestésico', diagnostico: 'Se apoya mucho utilizando material didáctico concreto.', incidentes: [] },
  { id: 22, nombre: 'Renteria Catalan Giselle', asistencia: true, lugar: 'salon', tarea: true, canal: 'Auditivo', diagnostico: 'Excelente comprensión lectora al leer en voz alta.', incidentes: [] },
  { id: 23, nombre: 'Orozco Lopez Jose De Jesus', asistencia: true, lugar: 'salon', tarea: true, canal: 'Visual', diagnostico: 'Requiere indicaciones visuales claras en el pizarrón.', incidentes: [] }
];

export default function App() {
  const [auth, setAuth] = useState({ auth: false, error: '', pass: '' });
  const [state, setState] = useState({
    alumnos: alumnosIniciales, fecha: new Date().toISOString().split('T')[0],
    busqueda: '', filtro: 'Todos', vista: 'registro', guardado: false,
    alSel: null, idInc: null, nuevoInc: { categoria: 'Conducta', detalle: '' }
  });

  const { alumnos, fecha, busqueda, filtro, vista, guardado, alSel, idInc, nuevoInc } = state;
  const set = (k, v) => setState(p => ({ ...p, [k]: v }));

  // EFECTO MÁGICO: Carga el historial al cambiar la fecha en el calendario
  useEffect(() => {
    try {
      const historial = JSON.parse(localStorage.getItem('historial_3a') || '{}');
      // Si hay registro de ese día lo carga, si no, carga la lista en limpio clonada
      set('alumnos', historial[fecha] || JSON.parse(JSON.stringify(alumnosIniciales)));
    } catch (e) { console.error(e); }
  }, [fecha]);

  const alumnosFiltrados = alumnos.filter(a => 
    a.nombre?.toLowerCase().includes(busqueda.toLowerCase()) && (filtro === 'Todos' || a.canal === filtro)
  );

  const manejarIngreso = (e) => {
    e.preventDefault();
    auth.pass === 'Profe2026' ? setAuth({ ...auth, auth: true }) : setAuth({ ...auth, error: 'Contraseña incorrecta', pass: '' });
  };

  const updateAl = (id, fn) => {
    const arr = alumnos.map(a => a.id === id ? fn(a) : a);
    set('alumnos', arr);
    if (alSel?.id === id) set('alSel', arr.find(a => a.id === id));
  };

  const tog = (id, k) => updateAl(id, a => ({ ...a, [k]: k === 'lugar' ? (a.lugar === 'salon' ? 'casa' : 'salon') : !a[k] }));

  const modInc = (id, action, incId = null) => {
    if (action === 'add' && !nuevoInc.detalle.trim()) return;
    updateAl(id, a => ({
      ...a, incidentes: action === 'add' 
        ? [{ id: Date.now(), fecha, ...nuevoInc }, ...a.incidentes]
        : a.incidentes.filter(i => i.id !== incId)
    }));
    if (action === 'add') { set('nuevoInc', { categoria: 'Conducta', detalle: '' }); set('idInc', null); }
  };

  // Función Guardar (Conectada a Sheets y ahora guarda Historial Local)
  const guardarSheets = async () => {
    set('guardado', true);
    
    // 1. Guardar copia en el historial local del navegador
    try {
      const historial = JSON.parse(localStorage.getItem('historial_3a') || '{}');
      historial[fecha] = alumnos;
      localStorage.setItem('historial_3a', JSON.stringify(historial));
    } catch (e) { console.error(e); }

    // 2. Enviar a Google Sheets
    try {
      const params = new URLSearchParams({ data: JSON.stringify({ fecha, alumnos }) });
      await fetch('https://script.google.com/macros/s/AKfycbwaILRlvuvI84N9iVF3swItyIoBFn3IpClSGkbrJV7g7RVzRCDmjPbIkFJK3hLSOCog/exec', 
        { method: 'POST', mode: 'no-cors', body: params });
    } catch (e) { console.error(e); }
    
    setTimeout(() => set('guardado', false), 2500);
  };

  // Estadísticas calculadas
  const pres = alumnos.filter(a => a.asistencia).length;
  const stats = [
    { t: 'Asistencia', v: `${alumnos.length ? Math.round((pres / alumnos.length) * 100) : 0}%`, s: `(${pres}/${alumnos.length})`, I: UserCheck, c: 'text-[#00E676]', bg: 'bg-[#00E676]/10' },
    { t: 'Inasistencias', v: alumnos.length - pres, s: 'alumnos', I: UserX, c: 'text-rose-400', bg: 'bg-rose-500/10' },
    { t: 'Trabajo en Casa', v: alumnos.filter(a => a.asistencia && a.lugar === 'casa').length, s: 'hoy', I: Home, c: 'text-[#00E5FF]', bg: 'bg-[#00E5FF]/10' },
    { t: 'Tareas', v: alumnos.filter(a => a.asistencia && a.tarea).length, s: 'entregadas', I: BookOpen, c: 'text-indigo-400', bg: 'bg-indigo-500/10' }
  ];

  if (!auth.auth) return (
    <>
      <style>{`body, html, #root { margin: 0; padding: 0; width: 100%; min-height: 100vh; background-color: #0B1221; }`}</style>
      <div className="min-h-screen bg-[#0B1221] flex items-center justify-center p-4 w-full">
        <div className="bg-[#151D2E] p-8 rounded-2xl shadow-2xl max-w-md w-full text-center border border-slate-800">
          <Lock className="w-12 h-12 text-[#00E5FF] mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-1">Registro 3 A</h2>
          <p className="text-slate-400 text-sm mb-6">Acceso Restringido</p>
          <form onSubmit={manejarIngreso} className="space-y-4">
            <input type="password" placeholder="Clave Docente" value={auth.pass} onChange={e => setAuth({...auth, pass: e.target.value})}
              className="w-full p-4 bg-[#0B1221] text-center text-xl text-white rounded-xl border border-slate-700 outline-none focus:border-[#00E5FF]" autoFocus />
            {auth.error && <p className="text-rose-400 text-xs">{auth.error}</p>}
            <button type="submit" className="w-full bg-[#00E5FF] text-[#0B1221] font-bold py-3 rounded-xl hover:bg-[#00cce6] transition">Desbloquear</button>
          </form>
        </div>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-[#0B1221] text-slate-300 pb-24 print:bg-white print:text-black font-sans w-full selection:bg-[#00E5FF] selection:text-black flex flex-col">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap'); html, body, #root { font-family: 'Inter', sans-serif; margin: 0; padding: 0; width: 100%; min-height: 100vh; background-color: #0B1221; }`}</style>

      <header className="bg-[#151D2E] shadow border-b border-slate-800/80 sticky top-0 z-30 print:hidden p-4 w-full">
        <div className="w-full px-2 md:px-6 flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <Award className="w-8 h-8 text-[#00E5FF] p-1.5 bg-[#00E5FF]/10 rounded-lg" />
            <div>
              <h1 className="text-lg font-bold text-white">CONTROL DOCENTE <span className="text-[#00E5FF]">3° "A"</span></h1>
              <p className="text-xs text-slate-400">Profr. Aristeo Maya Corona</p>
            </div>
          </div>
          <div className="flex bg-[#0B1221] p-2 rounded-xl border border-slate-700 items-center">
            <Calendar className="w-4 h-4 text-[#00E5FF] mx-2" />
            <input type="date" value={fecha} onChange={e => set('fecha', e.target.value)} className="bg-transparent text-sm text-white font-bold outline-none [color-scheme:dark]" />
          </div>
        </div>
      </header>

      <div className="w-full px-4 md:px-8 mt-6">
        <div className="flex gap-2 print:hidden mb-6 max-w-xl">
          {[{ id: 'registro', i: BookOpenCheck, t: 'Pase de Lista' }, { id: 'reporte', i: Printer, t: 'Vista Impresión' }].map(b => (
            <button key={b.id} onClick={() => set('vista', b.id)} className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition ${vista === b.id ? 'bg-[#00E5FF] text-[#0B1221]' : 'bg-[#151D2E] text-slate-400 border border-slate-700'}`}>
              <b.i className="w-4 h-4" /> {b.t}
            </button>
          ))}
        </div>

        {vista === 'registro' && (
          <div className="space-y-6 print:hidden">
            {/* Tarjetas CRM */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((s, i) => (
                <div key={i} className="bg-[#151D2E] p-4 rounded-2xl shadow-lg border border-slate-800 flex items-center gap-4">
                  <s.I className={`w-10 h-10 p-2 rounded-xl ${s.bg} ${s.c}`} />
                  <div><p className="text-[10px] uppercase text-slate-400 font-bold">{s.t}</p><p className={`text-xl font-bold ${s.c === 'text-indigo-400' ? 'text-white' : s.c}`}>{s.v} <span className="text-xs text-slate-500">{s.s}</span></p></div>
                </div>
              ))}
            </div>

            {/* Buscador */}
            <div className="bg-[#151D2E] p-4 rounded-2xl border border-slate-800 flex flex-wrap gap-4 items-center">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input type="text" placeholder="Buscar..." value={busqueda} onChange={e => set('busqueda', e.target.value)} className="w-full pl-9 p-2 bg-[#0B1221] text-sm text-white rounded-lg border border-slate-700 outline-none focus:border-[#00E5FF]" />
              </div>
              <select value={filtro} onChange={e => set('filtro', e.target.value)} className="p-2 bg-[#0B1221] text-sm text-white border border-slate-700 rounded-lg outline-none">
                {['Todos', 'Visual', 'Auditivo', 'Kinestésico'].map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>

            {/* Grid de Alumnos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 gap-4">
              {alumnosFiltrados.map(a => (
                <div key={a.id} className={`bg-[#151D2E] p-4 rounded-2xl border flex flex-col gap-3 ${a.asistencia ? 'border-slate-800' : 'border-rose-900/40 bg-rose-950/10'}`}>
                  <div className="flex justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-white leading-tight">{a.nombre}</h3>
                      <p className="text-[10px] text-slate-400 mt-1">N.L: {a.id} • <span className="uppercase text-[#00E5FF]">{a.canal}</span></p>
                    </div>
                    <button onClick={() => set('alSel', a)} className="p-2 bg-[#0B1221] rounded-lg text-slate-400 hover:text-[#00E5FF] shrink-0 border border-slate-800 h-fit"><User className="w-4 h-4" /></button>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <button onClick={() => tog(a.id, 'asistencia')} className={`p-2 rounded-lg border text-[10px] font-bold flex flex-col items-center ${a.asistencia ? 'bg-[#00E676]/10 text-[#00E676] border-[#00E676]/20' : 'bg-rose-500/10 text-rose-400 border-rose-500/20'}`}>
                      {a.asistencia ? <UserCheck className="w-4 h-4 mb-1" /> : <UserX className="w-4 h-4 mb-1" />} {a.asistencia ? 'PRESENTE' : 'FALTÓ'}
                    </button>
                    <button onClick={() => tog(a.id, 'lugar')} disabled={!a.asistencia} className={`p-2 rounded-lg border text-[10px] font-bold flex flex-col items-center ${!a.asistencia ? 'opacity-30 border-slate-800 bg-[#0B1221]' : a.lugar === 'salon' ? 'bg-[#00E5FF]/10 text-[#00E5FF] border-[#00E5FF]/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'}`}>
                      {a.lugar === 'salon' ? <School className="w-4 h-4 mb-1" /> : <Home className="w-4 h-4 mb-1" />} {a.lugar === 'salon' ? 'SALÓN' : 'CASA'}
                    </button>
                    <button onClick={() => tog(a.id, 'tarea')} disabled={!a.asistencia} className={`p-2 rounded-lg border text-[10px] font-bold flex flex-col items-center ${!a.asistencia ? 'opacity-30 border-slate-800 bg-[#0B1221]' : a.tarea ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' : 'bg-[#0B1221] text-slate-400 border-slate-700'}`}>
                      <BookOpen className="w-4 h-4 mb-1" /> {a.tarea ? 'CUMPLIÓ' : 'PENDIENTE'}
                    </button>
                  </div>

                  <div className="border-t border-slate-800 pt-2">
                    {idInc === a.id ? (
                      <div className="flex gap-2">
                        <select value={nuevoInc.categoria} onChange={e => set('nuevoInc', {...nuevoInc, categoria: e.target.value})} className="text-xs p-1.5 bg-[#0B1221] border border-slate-700 rounded text-white outline-none">
                          {['Conducta', 'Académico', 'Salud'].map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                        <input type="text" placeholder="Nota..." value={nuevoInc.detalle} onChange={e => set('nuevoInc', {...nuevoInc, detalle: e.target.value})} className="flex-1 text-xs p-1.5 bg-[#0B1221] border border-slate-700 rounded text-white outline-none" />
                        <button onClick={() => modInc(a.id, 'add')} className="bg-[#00E5FF] text-black px-2 rounded font-bold"><Plus className="w-4 h-4" /></button>
                      </div>
                    ) : (
                      <button onClick={() => set('idInc', a.id)} className="text-[10px] text-[#00E5FF] flex items-center gap-1 font-bold"><Plus className="w-3 h-3" /> Agregar Nota {a.incidentes.length > 0 && <span className="text-amber-400 ml-2">({a.incidentes.length})</span>}</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Modal Ficha Técnica */}
        {alSel && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50 print:hidden">
            <div className="bg-[#151D2E] rounded-2xl w-full max-w-md border border-slate-700 p-5 space-y-4">
              <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                <div><h3 className="text-white font-bold">{alSel.nombre}</h3><p className="text-xs text-slate-400">Ficha Técnica</p></div>
                <button onClick={() => set('alSel', null)} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="text-slate-500 font-bold block mb-1">Canal:</label>
                  <select value={alSel.canal} onChange={e => updateAl(alSel.id, a => ({...a, canal: e.target.value}))} className="w-full p-2 bg-[#0B1221] border border-slate-700 rounded text-white outline-none">
                    {['Visual', 'Auditivo', 'Kinestésico'].map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div><label className="text-slate-500 font-bold block mb-1">Diagnóstico:</label><textarea value={alSel.diagnostico} onChange={e => updateAl(alSel.id, a => ({...a, diagnostico: e.target.value}))} className="w-full p-2 bg-[#0B1221] border border-slate-700 rounded text-white h-10 resize-none outline-none" /></div>
              </div>
              <div className="space-y-2 max-h-40 overflow-auto">
                <h4 className="text-xs font-bold text-white border-b border-slate-800 pb-1">Bitácora ({alSel.incidentes.length})</h4>
                {alSel.incidentes.map(i => (
                  <div key={i.id} className="text-xs bg-[#0B1221] p-2 rounded flex justify-between items-start gap-2 border border-slate-800">
                    <div><span className="text-amber-400 font-bold mr-2">{i.categoria}</span><span className="text-slate-500">{i.fecha}</span><p className="text-slate-300 mt-1">{i.detalle}</p></div>
                    <button onClick={() => modInc(alSel.id, 'del', i.id)} className="text-slate-500 hover:text-rose-500"><Trash2 className="w-4 h-4" /></button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* VISTA DE REPORTE - RESTRINGIDA A TAMAÑO DE HOJA (CARTA) */}
        {/* ============================================================== */}
        {vista === 'reporte' && (
          <div className="w-full max-w-[900px] mx-auto pb-20 print:pb-0">
            
            {/* Panel de control de impresión */}
            <div className="bg-[#151D2E] p-4 rounded-xl border border-slate-800 flex justify-between items-center mb-6 print:hidden shadow-lg">
              <div>
                <h3 className="text-white font-bold flex items-center gap-2"><Printer className="w-5 h-5 text-[#00E5FF]" /> Preparado para Imprimir</h3>
                <p className="text-xs text-slate-400">El diseño ya simula una hoja Carta.</p>
              </div>
              <button onClick={() => window.print()} className="bg-[#00E5FF] text-[#0B1221] px-5 py-2.5 rounded-lg font-bold flex items-center gap-2 hover:bg-[#00cce6] transition shadow-[0_0_15px_rgba(0,229,255,0.3)]">
                Imprimir Documento
              </button>
            </div>

            {/* Hoja Blanca (A4/Carta) */}
            <div className="bg-white p-10 md:p-14 shadow-2xl rounded-sm text-black print:p-0 print:shadow-none border border-slate-200 print:border-none">
              
              <header className="border-b-2 border-black pb-4 mb-6 flex justify-between items-end">
                <div>
                  <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tight">Reporte Control Docente</h1>
                  <p className="text-sm font-bold text-slate-700 mt-1">3° "A" • Profr. Aristeo Maya Corona</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold">FECHA:</p>
                  <p className="text-xl font-black">{fecha}</p>
                </div>
              </header>
              
              <table className="w-full text-left text-xs md:text-sm border-collapse">
                <thead>
                  <tr className="border-y-2 border-black bg-slate-100">
                    <th className="p-3 font-black">N.L.</th>
                    <th className="p-3 font-black">Nombre del Alumno</th>
                    <th className="p-3 font-black text-center">Asist.</th>
                    <th className="p-3 font-black text-center">Ubicación</th>
                    <th className="p-3 font-black text-center">Tarea</th>
                    <th className="p-3 font-black">Canal</th>
                  </tr>
                </thead>
                <tbody>
                  {alumnos.map(a => (
                    <tr key={a.id} className="border-b border-slate-300">
                      <td className="p-3 font-black text-slate-600">{a.id}</td>
                      <td className="p-3 font-bold uppercase">{a.nombre}</td>
                      <td className="p-3 text-center font-bold">{a.asistencia ? 'PRESENTE' : 'FALTÓ'}</td>
                      <td className="p-3 text-center capitalize">{a.asistencia ? a.lugar : '-'}</td>
                      <td className="p-3 text-center font-bold">{a.asistencia ? (a.tarea ? 'CUMPLIÓ' : 'PENDIENTE') : '-'}</td>
                      <td className="p-3 font-bold uppercase text-[10px] md:text-xs text-slate-500">{a.canal}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <footer className="mt-20 pt-4 border-t-2 border-black flex justify-between text-xs font-bold text-center">
                <div className="w-48 pt-2">
                  <div className="border-b border-black mb-2 h-10"></div>
                  Firma Docente
                </div>
                <div className="w-48 pt-2">
                  <div className="border-b border-black mb-2 h-10"></div>
                  Vo. Bo. Dirección
                </div>
              </footer>
            </div>
          </div>
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-3 bg-[#0B1221]/95 border-t border-slate-800 z-30 print:hidden flex justify-center w-full">
        <button onClick={guardarSheets} disabled={guardado} className={`w-full max-w-lg py-3 rounded-xl font-bold flex items-center justify-center gap-2 text-sm transition-colors shadow-lg ${guardado ? 'bg-[#00E676] text-[#0B1221]' : 'bg-[#00E676] text-[#0B1221] hover:bg-[#00c766]'}`}>
          {guardado ? <><CheckCircle2 className="w-5 h-5" /> ¡GUARDADO EN SHEETS!</> : <><Save className="w-5 h-5" /> GUARDAR EN GOOGLE SHEETS</>}
        </button>
      </div>
    </div>
  );
}