import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  Calendar, UserCheck, UserX, Home, School, BookOpen, Save, CheckCircle2, 
  Printer, Search, BookOpenCheck, AlertCircle, Plus, Trash2, X, FileText, Award, User,
  Lock, ShieldAlert, RefreshCw, CloudDownload
} from 'lucide-react';

const alumnosIniciales = [
  { id: 1, nombre: 'Carmona Hilario Dayra Nahomi', asistencia: true, lugar: 'salon', tarea: true, canal: 'Visual', diagnostico: 'Aprende mejor con ejemplos visuales y colores.', incidentes: [] },
  { id: 2, nombre: 'Burgos Mancilla Franco', asistencia: true, lugar: 'salon', tarea: true, canal: 'Kinestésico', diagnostico: 'Disfruta el aprendizaje práctico y dinámico.', incidentes: [] },
  { id: 3, nombre: 'Calixto Daza Jose Guadalupe', asistencia: true, lugar: 'salon', tarea: true, canal: 'Auditivo', diagnostico: 'Participa activamente al escuchar explicaciones.', incidentes: [] },
  { id: 4, nombre: 'Castillo Valle Erick Alberto', asistencia: true, lugar: 'salon', tarea: true, canal: 'Visual', diagnostico: 'Buena retención de textos anotados en el pizarrón.', incidentes: [] },
  { id: 5, nombre: 'Gonzalez Barrera Andrew Dennis', asistencia: true, lugar: 'salon', tarea: true, canal: 'Auditivo', diagnostico: 'Aprende muy bien a través del diálogo en clase.', incidentes: [] },
  { id: 6, nombre: 'Hernandez Benitez Naomi', asistencia: true, lugar: 'salon', tarea: true, canal: 'Visual', diagnostico: 'Organiza excelentemente sus apuntes y esquemas.', incidentes: [] },
  { id: 7, nombre: 'Hernandez Valencia Fernando Martin', asistencia: true, lugar: 'salon', tarea: true, canal: 'Kinestésico', diagnostico: 'Necesita dinamismo y pausas activas en la clase.', incidentes: [] },
  { id: 8, nombre: 'Luviano Jimenez Said', asistencia: true, lugar: 'salon', tarea: true, canal: 'Auditivo', diagnostico: 'Comprende muy bien las instrucciones orales complejas.', incidentes: [] },
  { id: 9, nombre: 'Luviano Salgado Iker', asistencia: true, lugar: 'salon', tarea: true, canal: 'Visual', diagnostico: 'Destaca en actividades de lectura silenciosa.', incidentes: [] },
  { id: 10, nombre: 'Montor Leon Arlet Berenice', asistencia: true, lugar: 'salon', tarea: true, canal: 'Kinestésico', diagnostico: 'Le gusta el trabajo en equipo y estar en movimiento.', incidentes: [] },
  { id: 11, nombre: 'Peña Molina Dulce Yamilet', asistencia: true, lugar: 'salon', tarea: true, canal: 'Auditivo', diagnostico: 'Muy atenta a las participaciones grupales.', incidentes: [] },
  { id: 12, nombre: 'Perez Pedroza Dara Betsabe', asistencia: true, lugar: 'salon', tarea: true, canal: 'Visual', diagnostico: 'Muy receptiva a organizadores gráficos.', incidentes: [] },
  { id: 13, nombre: 'Rabadan Orrosquieta Jesus Enrique', asistencia: true, lugar: 'salon', tarea: true, canal: 'Kinestésico', diagnostico: 'Aprende rápido a través del juego y retos físicos.', incidentes: [] },
  { id: 14, nombre: 'Saucedo Espinoza Alvaro Santiago', asistencia: true, lugar: 'salon', tarea: true, canal: 'Visual', diagnostico: 'Trabaja de forma muy ordenada en su libreta.', incidentes: [] },
  { id: 15, nombre: 'Toribio Herrera Eleazar', asistencia: true, lugar: 'salon', tarea: true, canal: 'Kinestésico', diagnostico: 'Excelente coordinación motriz en las actividades.', incidentes: [] },
  { id: 16, nombre: 'Torres Aguilera Kathia Paloma', asistencia: true, lugar: 'salon', tarea: true, canal: 'Visual', diagnostico: 'Facilidad para aprender mediante la observación directa.', incidentes: [] },
  { id: 17, nombre: 'Zavala Pineda Vaitiare Monserrat', asistencia: true, lugar: 'salon', tarea: true, canal: 'Visual', diagnostico: 'Comprende fácilmente lecturas de texto.', incidentes: [] },
  { id: 18, nombre: 'Lopez Venegas Rosalia', asistencia: true, lugar: 'salon', tarea: true, canal: 'Kinestésico', diagnostico: 'Se apoya mucho utilizando material didáctico concreto.', incidentes: [] },
  { id: 19, nombre: 'Renteria Catalan Giselle', asistencia: true, lugar: 'salon', tarea: true, canal: 'Auditivo', diagnostico: 'Excelente comprensión lectora al leer en voz alta.', incidentes: [] },
  { id: 20, nombre: 'Orozco Lopez Jose De Jesus', asistencia: true, lugar: 'salon', tarea: true, canal: 'Visual', diagnostico: 'Requiere indicaciones visuales claras en el pizarrón.', incidentes: [] }
];

const opcionesFaltasForm = [
  "Falta de respeto a la autoridad docente",
  "Falta de respeto a compañeros (burlas, apodos, agresiones verbales)",
  "Agresión física (empujones, golpes, juegos bruscos)",
  "Uso de lenguaje inapropiado o groserías",
  "Interrupción constante del trabajo escolar",
  "Daño deliberado al mobiliario o material escolar",
  "Incumplimiento reiterado de tareas o material"
];

const CONTRASENA_CORRECTA = 'Profe2026'; 

export default function App() {
  // Autenticación
  const [estaAutenticado, setEstaAutenticado] = useState(false);
  const [contrasena, setContrasena] = useState('');
  const [errorLogin, setErrorLogin] = useState('');

  // Estados Globales
  const [alumnos, setAlumnos] = useState(alumnosIniciales);
  const [fecha, setFecha] = useState(new Date().toISOString().split('T')[0]);
  const [busqueda, setBusqueda] = useState('');
  const [filtroCanal, setFiltroCanal] = useState('Todos');
  const [vista, setVista] = useState('registro'); 
  const [guardado, setGuardado] = useState(false);
  
  // Sincronización en la nube (nuevo)
  const [sincronizando, setSincronizando] = useState(false);
  const [estadoSync, setEstadoSync] = useState(''); // '', 'ok', 'error'

  // Modales e Incidentes rápidos
  const [alumnoSeleccionado, setAlumnoSeleccionado] = useState(null);
  const [incidenteNuevo, setIncidenteNuevo] = useState({ categoria: 'Conducta', detalle: '' });
  const [idAlumnoIncidente, setIdAlumnoIncidente] = useState(null);

  // Estados para la Bitácora Formal
  const [formFormal, setFormFormal] = useState({
    idAlumno: '', lugar: 'Salón de clases', hora: '', testigos: '',
    faltasSeleccionadas: [], descripcion: '', accion: '', acuerdos: ''
  });
  const [imprimirFormal, setImprimirFormal] = useState(false);

  // Efecto: Cargar historial local al cambiar la fecha
  useEffect(() => {
    const historialGuardado = localStorage.getItem(`historial_3a_${fecha}`);
    if (historialGuardado) {
      setAlumnos(JSON.parse(historialGuardado));
    } else {
      setAlumnos(alumnosIniciales.map(al => ({
        ...al, asistencia: true, lugar: 'salon', tarea: true, incidentes: []
      })));
    }
  }, [fecha]);

  // Manejo de Ingreso
  const manejarIngreso = useCallback((e) => {
    e.preventDefault();
    if (contrasena === CONTRASENA_CORRECTA) {
      setEstaAutenticado(true);
    } else {
      setErrorLogin('Clave incorrecta. Intenta de nuevo.');
      setContrasena(''); 
    }
  }, [contrasena]);

  // Filtros optimizados
  const alumnosFiltrados = useMemo(() => {
    const busquedaLower = busqueda.toLowerCase();
    return alumnos.filter(alumno => 
      (filtroCanal === 'Todos' || alumno.canal === filtroCanal) &&
      (busquedaLower === '' || alumno.nombre.toLowerCase().includes(busquedaLower))
    );
  }, [alumnos, busqueda, filtroCanal]);

  // Funciones de actualización
  const toggleAsistencia = useCallback((id) => {
    setAlumnos(prev => prev.map(al => al.id === id ? { ...al, asistencia: !al.asistencia } : al));
  }, []);

  const toggleLugar = useCallback((id) => {
    setAlumnos(prev => prev.map(al => al.id === id ? { ...al, lugar: al.lugar === 'salon' ? 'casa' : 'salon' } : al));
  }, []);

  const toggleTarea = useCallback((id) => {
    setAlumnos(prev => prev.map(al => al.id === id ? { ...al, tarea: !al.tarea } : al));
  }, []);

  const agregarIncidente = useCallback((id) => {
    if (!incidenteNuevo.detalle.trim()) return;
    const nuevoObj = {
      id: Date.now(), fecha: fecha, categoria: incidenteNuevo.categoria, detalle: incidenteNuevo.detalle
    };
    
    setAlumnos(prev => prev.map(al => al.id === id ? { ...al, incidentes: [nuevoObj, ...al.incidentes] } : al));
    setIncidenteNuevo({ categoria: 'Conducta', detalle: '' });
    setIdAlumnoIncidente(null);
    
    setAlumnoSeleccionado(prev => prev && prev.id === id ? { ...prev, incidentes: [nuevoObj, ...prev.incidentes] } : prev);
  }, [incidenteNuevo, fecha]);

  const eliminarIncidente = useCallback((alumnoId, incidenteId) => {
    setAlumnos(prev => prev.map(al => al.id === alumnoId ? { ...al, incidentes: al.incidentes.filter(inc => inc.id !== incidenteId) } : al));
    setAlumnoSeleccionado(prev => prev && prev.id === alumnoId ? { ...prev, incidentes: prev.incidentes.filter(inc => inc.id !== incidenteId) } : prev);
  }, []);

  const guardarPerfilPedagogico = useCallback((id, nuevoCanal, nuevoDiag) => {
    setAlumnos(prev => prev.map(al => al.id === id ? { ...al, canal: nuevoCanal, diagnostico: nuevoDiag } : al));
    setAlumnoSeleccionado(prev => prev && prev.id === id ? { ...prev, canal: nuevoCanal, diagnostico: nuevoDiag } : prev);
  }, []);

  const toggleFaltaFormal = useCallback((falta) => {
    setFormFormal(prev => ({
      ...prev,
      faltasSeleccionadas: prev.faltasSeleccionadas.includes(falta)
        ? prev.faltasSeleccionadas.filter(f => f !== falta)
        : [...prev.faltasSeleccionadas, falta]
    }));
  }, []);

  const handleGuardarEnSheets = async () => {
    setGuardado(true);
    localStorage.setItem(`historial_3a_${fecha}`, JSON.stringify(alumnos));
    
    const urlScript = 'https://script.google.com/macros/s/AKfycbzotfghl-YIAjGOb4JVU4HEFr8BtbYHvmgrz2IsgB0ivphVEW8_t3oB6mwvTWsFhoLE/exec';
    try {
      const params = new URLSearchParams();
      params.append('data', JSON.stringify({ fecha, alumnos }));

      await fetch(urlScript, { method: 'POST', mode: 'no-cors', body: params });
    } catch (error) {
      console.error("Error al enviar a Sheets:", error);
    }
    setTimeout(() => setGuardado(false), 2500);
  };

  const handleSincronizarNube = async () => {
    setSincronizando(true);
    setEstadoSync('');
    const urlScript = 'https://script.google.com/macros/s/AKfycbzotfghl-YIAjGOb4JVU4HEFr8BtbYHvmgrz2IsgB0ivphVEW8_t3oB6mwvTWsFhoLE/exec';
    
    try {
      // Intenta hacer un GET. Si el script tiene doGet configurado, devolverá la data.
      const response = await fetch(`${urlScript}?fecha=${fecha}`);
      const text = await response.text();
      
      try {
        const data = JSON.parse(text);
        if (data && data.alumnos) {
          setAlumnos(data.alumnos);
          localStorage.setItem(`historial_3a_${fecha}`, JSON.stringify(data.alumnos));
          setEstadoSync('ok');
        } else {
          setEstadoSync('error');
        }
      } catch(e) {
        // Falló parsear JSON (probablemente CORS o no hay doGet configurado)
        console.warn("Respuesta no es JSON. Verifica que tu AppScript tenga doGet().", e);
        setEstadoSync('error');
      }
    } catch (error) {
      console.error("Error al sincronizar:", error);
      setEstadoSync('error');
    }
    
    setTimeout(() => {
      setSincronizando(false);
      setEstadoSync('');
    }, 4000);
  };

  const stats = useMemo(() => {
    const total = alumnos.length;
    let pres = 0, tar = 0, casa = 0;
    
    alumnos.forEach(a => {
      if (a.asistencia) {
        pres++;
        if (a.tarea) tar++;
        if (a.lugar === 'casa') casa++;
      }
    });

    return {
      total, presentes: pres, faltas: total - pres,
      porcentaje: total > 0 ? Math.round((pres / total) * 100) : 0,
      tareasCumplidas: tar, trabajandoCasa: casa
    };
  }, [alumnos]);

  const incidentesReporte = useMemo(() => {
    return alumnos.some(a => a.incidentes.length > 0) 
      ? alumnos.flatMap(a => a.incidentes.map(inc => ({ nombre: a.nombre, ...inc })))
      : [];
  }, [alumnos]);

  if (!estaAutenticado) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 w-full absolute inset-0 overflow-hidden bg-sky-100">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@500;700;800;900&display=swap');
          :root, body, #root { font-family: 'Nunito', sans-serif; }
          .cloud-bg {
            background-color: #dbeafe;
            background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 40 Q30 20 50 25 Q65 10 80 30 Q95 40 85 60 Q90 80 70 85 Q50 95 30 80 Q10 75 15 55 Q5 45 20 40 Z' fill='%23bfdbfe' opacity='0.4'/%3E%3C/svg%3E");
            background-size: 150px 150px;
          }
        `}</style>
        
        <div className="cloud-bg absolute inset-0 z-0 opacity-80"></div>
        
        <div className="bg-white p-8 md:p-10 rounded-[40px] shadow-[0_15px_40px_-10px_rgba(0,0,0,0.1)] max-w-md w-full text-center relative z-10 border-[6px] border-white ring-4 ring-sky-50">
          <div className="bg-[#4f46e5] w-24 h-24 rounded-[30px] flex items-center justify-center mx-auto mb-6 text-white shadow-[0_10px_20px_rgba(79,70,229,0.3)] rotate-3">
            <Lock className="w-12 h-12" />
          </div>
          
          <h2 className="text-3xl font-black text-[#1e1b4b] mb-2 tracking-tight">Registro 3° "A"</h2>
          <p className="text-slate-500 text-sm mb-8 font-bold">Por favor, ingresa tu clave maestra.</p>
          
          <form onSubmit={manejarIngreso} className="space-y-5">
            <input
              type="password"
              placeholder="•••••••••"
              value={contrasena}
              onChange={(e) => {
                setContrasena(e.target.value);
                setErrorLogin('');
              }}
              autoFocus
              className="w-full p-4 border-[3px] border-sky-100 bg-sky-50 rounded-[20px] outline-none focus:border-[#4f46e5] focus:bg-white transition-all text-center text-2xl tracking-[0.3em] font-black text-[#1e1b4b] shadow-inner"
            />
            {errorLogin && <p className="text-rose-500 text-sm font-black animate-pulse bg-rose-50 py-2 rounded-xl">{errorLogin}</p>}
            <button 
              type="submit" 
              className="w-full bg-[#4f46e5] hover:bg-[#4338ca] text-white font-black py-4 rounded-[20px] transition-all shadow-[0_8px_25px_rgba(79,70,229,0.4)] flex items-center justify-center gap-2 text-lg active:scale-95 hover:-translate-y-1"
            >
              <UserCheck className="w-6 h-6" /> Acceder al Portal
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen font-sans text-slate-700 pb-28 print:bg-white print:text-black print:p-0 print:pb-0 w-full selection:bg-[#4f46e5] selection:text-white bg-[#e0f2fe]">
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@500;700;800;900&display=swap');
        :root, body, #root {
          margin: 0; padding: 0;
          font-family: 'Nunito', sans-serif;
        }
        .app-bg {
          background-color: #e0f2fe;
          background-image: 
            radial-gradient(#bae6fd 3px, transparent 3px),
            radial-gradient(#bae6fd 3px, transparent 3px);
          background-size: 60px 60px;
          background-position: 0 0, 30px 30px;
        }
        @media print {
          @page { size: letter; margin: 1.5cm 2cm; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; background: white !important; }
          ::-webkit-scrollbar { display: none; }
        }
        .smooth-shadow { box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.08); }
        .bubbly-btn { transition: all 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55); }
        .bubbly-btn:active { transform: scale(0.95); }
      `}</style>

      <div className="app-bg fixed inset-0 z-0 opacity-70 pointer-events-none"></div>

      <header className="bg-white/80 backdrop-blur-xl shadow-sm sticky top-0 z-30 print:hidden w-full border-b-[3px] border-sky-100">
        <div className="px-4 md:px-8 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 w-full max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <span className="p-3 bg-[#4f46e5] text-white rounded-[20px] shadow-lg rotate-3 transform hover:rotate-12 transition-transform">
              <Award className="w-7 h-7" />
            </span>
            <div>
              <h1 className="text-2xl font-black text-[#1e1b4b] tracking-wide">CONTROL <span className="text-[#4f46e5]">3° "A"</span></h1>
              <p className="text-sm font-extrabold text-slate-400 mt-0.5">Profr. Aristeo Maya</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center bg-sky-50 px-5 py-3 rounded-[20px] border-[3px] border-sky-100 shadow-inner">
              <Calendar className="w-6 h-6 text-[#4f46e5] mr-3" />
              <input 
                type="date" 
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
                className="bg-transparent border-none outline-none text-base text-[#1e1b4b] font-black w-36 cursor-pointer"
              />
            </div>
          </div>
        </div>
      </header>

      <div className="w-full px-4 md:px-8 max-w-7xl mx-auto relative z-10">
        {/* Nav Tabs */}
        <div className="mt-8 flex flex-wrap gap-4 print:hidden w-full">
          <button
            onClick={() => { setVista('registro'); setImprimirFormal(false); }}
            className={`flex-1 md:flex-initial bubbly-btn flex items-center justify-center gap-3 px-6 py-4 rounded-[24px] text-base font-black ${
              vista === 'registro' 
              ? 'bg-[#4f46e5] text-white shadow-[0_8px_25px_rgba(79,70,229,0.35)] -translate-y-1' 
              : 'bg-white text-slate-500 hover:text-[#4f46e5] smooth-shadow border-[3px] border-transparent hover:border-[#4f46e5]/20'
            }`}
          >
            <BookOpenCheck className="w-6 h-6" /> Pase de Lista
          </button>
          
          <button
            onClick={() => { setVista('reporte'); setImprimirFormal(false); }}
            className={`flex-1 md:flex-initial bubbly-btn flex items-center justify-center gap-3 px-6 py-4 rounded-[24px] text-base font-black ${
              vista === 'reporte' 
              ? 'bg-[#4f46e5] text-white shadow-[0_8px_25px_rgba(79,70,229,0.35)] -translate-y-1' 
              : 'bg-white text-slate-500 hover:text-[#4f46e5] smooth-shadow border-[3px] border-transparent hover:border-[#4f46e5]/20'
            }`}
          >
            <Printer className="w-6 h-6" /> Reporte Diario
          </button>

          <button
            onClick={() => setVista('formal')}
            className={`flex-1 md:flex-initial bubbly-btn flex items-center justify-center gap-3 px-6 py-4 rounded-[24px] text-base font-black ${
              vista === 'formal' 
              ? 'bg-[#facc15] text-[#713f12] shadow-[0_8px_25px_rgba(250,204,21,0.4)] -translate-y-1' 
              : 'bg-white text-slate-500 hover:text-[#facc15] smooth-shadow border-[3px] border-transparent hover:border-[#facc15]/30'
            }`}
          >
            <ShieldAlert className="w-6 h-6" /> Bitácora / Acta
          </button>
        </div>

        {vista === 'registro' && (
          <section className="mt-8 print:hidden w-full">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 w-full">
              <div className="bg-white p-6 rounded-[30px] smooth-shadow border-[3px] border-emerald-100 flex items-center gap-5 relative overflow-hidden group">
                <div className="absolute -right-6 -top-6 w-24 h-24 bg-emerald-50 rounded-full transition-transform group-hover:scale-150 duration-500"></div>
                <div className="p-4 bg-emerald-100 text-emerald-600 rounded-[20px] relative z-10"><UserCheck className="w-8 h-8" /></div>
                <div className="relative z-10">
                  <p className="text-xs uppercase tracking-widest text-slate-400 font-black mb-1">Asistencia</p>
                  <p className="text-3xl font-black text-emerald-600">{stats.porcentaje}% <span className="text-sm font-bold text-slate-400 ml-1">({stats.presentes}/{stats.total})</span></p>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-[30px] smooth-shadow border-[3px] border-rose-100 flex items-center gap-5 relative overflow-hidden group">
                <div className="absolute -right-6 -top-6 w-24 h-24 bg-rose-50 rounded-full transition-transform group-hover:scale-150 duration-500"></div>
                <div className="p-4 bg-rose-100 text-rose-500 rounded-[20px] relative z-10"><UserX className="w-8 h-8" /></div>
                <div className="relative z-10">
                  <p className="text-xs uppercase tracking-widest text-slate-400 font-black mb-1">Faltas</p>
                  <p className="text-3xl font-black text-rose-500">{stats.faltas} <span className="text-sm font-bold text-slate-400 ml-1">alumnos</span></p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-[30px] smooth-shadow border-[3px] border-amber-100 flex items-center gap-5 relative overflow-hidden group">
                <div className="absolute -right-6 -top-6 w-24 h-24 bg-amber-50 rounded-full transition-transform group-hover:scale-150 duration-500"></div>
                <div className="p-4 bg-amber-100 text-amber-600 rounded-[20px] relative z-10"><Home className="w-8 h-8" /></div>
                <div className="relative z-10">
                  <p className="text-xs uppercase tracking-widest text-slate-400 font-black mb-1">En Casa</p>
                  <p className="text-3xl font-black text-amber-500">{stats.trabajandoCasa} <span className="text-sm font-bold text-slate-400 ml-1">hoy</span></p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-[30px] smooth-shadow border-[3px] border-[#e0e7ff] flex items-center gap-5 relative overflow-hidden group">
                <div className="absolute -right-6 -top-6 w-24 h-24 bg-[#e0e7ff] rounded-full transition-transform group-hover:scale-150 duration-500"></div>
                <div className="p-4 bg-[#e0e7ff] text-[#4f46e5] rounded-[20px] relative z-10"><BookOpen className="w-8 h-8" /></div>
                <div className="relative z-10">
                  <p className="text-xs uppercase tracking-widest text-slate-400 font-black mb-1">Tareas</p>
                  <p className="text-3xl font-black text-[#4f46e5]">{stats.tareasCumplidas} <span className="text-sm font-bold text-slate-400 ml-1">entregas</span></p>
                </div>
              </div>
            </div>
          </section>
        )}

        {vista === 'registro' && (
          <main className="mt-8 space-y-8 print:hidden w-full">
            <div className="bg-white p-5 rounded-[30px] smooth-shadow flex flex-col md:flex-row gap-5 justify-between items-center w-full border-[3px] border-white">
              <div className="relative flex-1 w-full max-w-lg">
                <Search className="w-6 h-6 text-[#4f46e5] absolute left-5 top-1/2 -translate-y-1/2" />
                <input 
                  type="text" placeholder="Buscar por nombre..." value={busqueda} onChange={(e) => setBusqueda(e.target.value)}
                  className="w-full pl-14 pr-5 py-4 bg-sky-50 border-[3px] border-sky-100 rounded-[24px] text-base font-black text-[#1e1b4b] outline-none focus:border-[#4f46e5] focus:bg-white transition-all shadow-inner"
                />
              </div>
              <div className="flex items-center gap-4 w-full md:w-auto bg-sky-50 p-2 rounded-[24px] border-[3px] border-sky-100">
                <span className="text-sm text-slate-500 font-black uppercase tracking-widest pl-3">Canal:</span>
                <select
                  value={filtroCanal} onChange={(e) => setFiltroCanal(e.target.value)}
                  className="bg-white border-[3px] border-sky-100 rounded-[18px] text-base font-black py-3 px-6 text-[#4f46e5] outline-none focus:border-[#4f46e5] w-full md:w-auto shadow-sm cursor-pointer"
                >
                  <option value="Todos">Todos</option><option value="Visual">Visual</option><option value="Auditivo">Auditivo</option><option value="Kinestésico">Kinestésico</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full pb-10">
              {alumnosFiltrados.length > 0 ? (
                alumnosFiltrados.map((alumno) => (
                  <div 
                    key={alumno.id}
                    className={`bg-white rounded-[32px] p-6 smooth-shadow border-[4px] transition-all duration-300 flex flex-col gap-5 h-full relative overflow-hidden hover:-translate-y-1.5 ${
                      alumno.asistencia ? 'border-white hover:border-[#4f46e5]/30' : 'border-rose-100 bg-rose-50/50'
                    }`}
                  >
                    <div className="absolute -right-4 -top-4 w-20 h-20 bg-sky-50 rounded-full flex items-end justify-start p-4 text-3xl font-black text-sky-200">
                      {alumno.id}
                    </div>

                    <div className="flex justify-between items-start gap-3 relative z-10">
                      <div className="flex-1 min-w-0 pr-10">
                        <h2 className="text-[17px] font-black text-[#1e1b4b] leading-tight break-words mb-3">{alumno.nombre}</h2>
                        <span className={`px-4 py-1.5 text-[11px] font-black rounded-xl uppercase tracking-widest ${
                          alumno.canal === 'Visual' ? 'bg-[#e0e7ff] text-[#4f46e5]' : alumno.canal === 'Auditivo' ? 'bg-[#fce7f3] text-[#be185d]' : 'bg-[#fef3c7] text-[#d97706]'
                        }`}>{alumno.canal}</span>
                      </div>
                      <button onClick={() => setAlumnoSeleccionado(alumno)} className="p-3 bg-white text-slate-400 hover:text-[#4f46e5] hover:bg-[#e0e7ff] rounded-[18px] transition-colors shrink-0 shadow-sm border-[2px] border-slate-100" title="Ver Perfil">
                        <User className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-3 gap-3 mt-auto pt-2 relative z-10">
                      <button onClick={() => toggleAsistencia(alumno.id)} className={`bubbly-btn flex flex-col items-center justify-center p-3 rounded-[20px] border-[3px] ${alumno.asistencia ? 'bg-[#ecfdf5] text-[#059669] border-[#a7f3d0]' : 'bg-rose-50 text-rose-500 border-rose-200 shadow-sm'}`}>
                        {alumno.asistencia ? <UserCheck className="w-6 h-6 mb-2" /> : <UserX className="w-6 h-6 mb-2" />}
                        <span className="text-[10px] font-black tracking-wide">{alumno.asistencia ? 'PRESENTE' : 'FALTÓ'}</span>
                      </button>
                      <button onClick={() => toggleLugar(alumno.id)} disabled={!alumno.asistencia} className={`bubbly-btn flex flex-col items-center justify-center p-3 rounded-[20px] border-[3px] ${!alumno.asistencia ? 'opacity-40 cursor-not-allowed bg-slate-50 border-slate-200 text-slate-400' : alumno.lugar === 'salon' ? 'bg-[#eff6ff] text-[#2563eb] border-[#bfdbfe]' : 'bg-[#fffbeb] text-[#d97706] border-[#fde68a]'}`}>
                        {alumno.lugar === 'salon' ? <School className="w-6 h-6 mb-2" /> : <Home className="w-6 h-6 mb-2" />}
                        <span className="text-[10px] font-black tracking-wide">{alumno.lugar === 'salon' ? 'SALÓN' : 'CASA'}</span>
                      </button>
                      <button onClick={() => toggleTarea(alumno.id)} disabled={!alumno.asistencia} className={`bubbly-btn flex flex-col items-center justify-center p-3 rounded-[20px] border-[3px] ${!alumno.asistencia ? 'opacity-40 cursor-not-allowed bg-slate-50 border-slate-200 text-slate-400' : alumno.tarea ? 'bg-[#faf5ff] text-[#9333ea] border-[#e9d5ff]' : 'bg-slate-50 text-slate-400 border-slate-200 shadow-inner'}`}>
                        <BookOpen className="w-6 h-6 mb-2" />
                        <span className="text-[10px] font-black tracking-wide">{alumno.tarea ? 'CUMPLIÓ' : 'NADA'}</span>
                      </button>
                    </div>

                    <div className="border-t-[3px] border-slate-50 pt-4 mt-2 relative z-10">
                      {idAlumnoIncidente === alumno.id ? (
                        <div className="space-y-3 bg-sky-50 p-4 rounded-[24px] border-[3px] border-sky-100">
                          <div className="flex gap-2">
                            <select value={incidenteNuevo.categoria} onChange={(e) => setIncidenteNuevo({ ...incidenteNuevo, categoria: e.target.value })} className="text-sm font-black p-2.5 bg-white border-[3px] border-sky-100 rounded-xl text-slate-600 outline-none focus:border-[#4f46e5] flex-1 cursor-pointer">
                              <option value="Conducta">Conducta</option><option value="Académico">Académico</option><option value="Emocional">Emocional</option><option value="Salud">Salud</option><option value="Cumplimiento">Cumplimiento</option>
                            </select>
                            <button onClick={() => setIdAlumnoIncidente(null)} className="text-slate-400 hover:text-rose-500 shrink-0 bg-white p-2.5 rounded-xl border-[3px] border-sky-100"><X className="w-5 h-5" /></button>
                          </div>
                          <textarea placeholder="Describe el detalle..." value={incidenteNuevo.detalle} onChange={(e) => setIncidenteNuevo({ ...incidenteNuevo, detalle: e.target.value })} className="w-full text-sm font-bold p-3 bg-white text-slate-700 border-[3px] border-sky-100 rounded-xl outline-none focus:border-[#4f46e5] resize-none h-16 shadow-inner" />
                          <button onClick={() => agregarIncidente(alumno.id)} className="w-full bg-[#4f46e5] hover:bg-[#4338ca] text-white text-sm py-3 rounded-xl font-black flex items-center justify-center gap-2 shadow-md">
                            <Plus className="w-5 h-5" /> Guardar Nota
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between bg-slate-50 p-2 rounded-2xl">
                          <button onClick={() => setIdAlumnoIncidente(alumno.id)} className="text-[12px] text-[#4f46e5] hover:bg-[#e0e7ff] px-3 py-1.5 rounded-xl flex items-center gap-1.5 font-black transition-colors"><Plus className="w-4 h-4" /> Nueva Nota</button>
                          {alumno.incidentes.length > 0 && <span className="flex items-center gap-1.5 text-[11px] bg-[#fef08a] text-[#854d0e] px-3 py-1.5 rounded-xl font-black"><AlertCircle className="w-4 h-4" /> {alumno.incidentes.length} Nota(s)</span>}
                        </div>
                      )}
                      {alumno.incidentes.length > 0 && idAlumnoIncidente !== alumno.id && (
                        <div className="mt-3 space-y-2">
                          {alumno.incidentes.slice(0, 1).map((inc) => (
                            <div key={inc.id} className="text-[12px] font-bold bg-[#fffbeb] p-3 rounded-[16px] border-[2px] border-[#fde68a] flex items-start gap-2 shadow-sm">
                              <span className="font-black text-[#d97706] uppercase">{inc.categoria}:</span>
                              <p className="flex-1 text-slate-600 truncate">{inc.detalle}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full bg-white rounded-[40px] p-16 text-center smooth-shadow border-[4px] border-white">
                  <div className="w-24 h-24 bg-sky-50 rounded-[30px] flex items-center justify-center mx-auto mb-4 text-sky-200 rotate-6">
                    <Search className="w-10 h-10" />
                  </div>
                  <p className="text-slate-400 font-black text-xl">No se encontraron alumnos.</p>
                </div>
              )}
            </div>
          </main>
        )}

        {alumnoSeleccionado && (
          <div className="fixed inset-0 bg-[#1e1b4b]/40 backdrop-blur-sm flex items-center justify-center p-4 z-50 print:hidden">
            <div className="bg-white rounded-[40px] max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border-[6px] border-white flex flex-col relative ring-4 ring-sky-50">
              <div className="absolute top-0 left-0 w-full h-32 bg-[#e0f2fe] rounded-t-[34px] z-0"></div>
              
              <header className="p-8 pb-4 flex items-center justify-between sticky top-0 z-10">
                <div className="flex items-center gap-4">
                  <span className="p-4 bg-white text-[#4f46e5] rounded-[24px] shadow-lg rotate-3"><User className="w-8 h-8" /></span>
                  <div><h3 className="text-2xl font-black text-[#1e1b4b]">Ficha Técnica</h3><p className="text-sm font-bold text-slate-500">Perfil del Alumno</p></div>
                </div>
                <button onClick={() => setAlumnoSeleccionado(null)} className="p-3 text-slate-400 hover:text-rose-500 bg-white shadow-md rounded-full transition-colors"><X className="w-6 h-6" /></button>
              </header>

              <div className="p-8 space-y-8 relative z-10 pt-4">
                <div className="bg-white p-6 rounded-[30px] shadow-[0_4px_20px_rgba(0,0,0,0.05)] border-[3px] border-sky-50 space-y-6">
                  <div>
                    <label className="text-xs uppercase tracking-widest font-black text-slate-400">Nombre Completo</label>
                    <p className="text-xl font-black text-[#1e1b4b] mt-1">{alumnoSeleccionado.nombre}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="text-xs uppercase tracking-widest font-black text-slate-400">Canal</label>
                      <select value={alumnoSeleccionado.canal} onChange={(e) => guardarPerfilPedagogico(alumnoSeleccionado.id, e.target.value, alumnoSeleccionado.diagnostico)} className="w-full mt-2 p-4 bg-sky-50 border-[3px] border-sky-100 rounded-[20px] text-sm font-black text-[#4f46e5] outline-none focus:border-[#4f46e5] cursor-pointer">
                        <option value="Visual">Visual</option><option value="Auditivo">Auditivo</option><option value="Kinestésico">Kinestésico</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-widest font-black text-slate-400">Ubicación</label>
                      <div className={`mt-2 p-4 rounded-[20px] border-[3px] flex items-center gap-3 text-sm font-black uppercase ${alumnoSeleccionado.lugar === 'salon' ? 'bg-[#eff6ff] border-[#bfdbfe] text-[#2563eb]' : 'bg-[#fffbeb] border-[#fde68a] text-[#d97706]'}`}>
                        {alumnoSeleccionado.lugar === 'salon' ? <School className="w-5 h-5" /> : <Home className="w-5 h-5" />}
                        {alumnoSeleccionado.lugar === 'salon' ? 'Salón' : 'Casa'}
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-widest font-black text-slate-400">Notas / Diagnóstico</label>
                    <textarea value={alumnoSeleccionado.diagnostico} onChange={(e) => guardarPerfilPedagogico(alumnoSeleccionado.id, alumnoSeleccionado.canal, e.target.value)} className="w-full mt-2 p-4 text-sm font-bold bg-sky-50 text-slate-600 border-[3px] border-sky-100 rounded-[20px] outline-none focus:border-[#4f46e5] h-24 shadow-inner" />
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-lg font-black text-[#1e1b4b] flex items-center gap-2"><FileText className="w-6 h-6 text-[#4f46e5]" /> Bitácora ({alumnoSeleccionado.incidentes.length})</h4>
                  <div className="space-y-3 max-h-56 overflow-y-auto pr-2">
                    {alumnoSeleccionado.incidentes.length > 0 ? alumnoSeleccionado.incidentes.map((inc) => (
                      <div key={inc.id} className="p-5 bg-white shadow-sm rounded-[24px] border-[3px] border-slate-100 flex justify-between gap-4">
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-3">
                            <span className="text-[10px] font-black bg-[#fef08a] text-[#854d0e] px-3 py-1 rounded-xl uppercase tracking-wider">{inc.categoria}</span>
                            <span className="text-[11px] font-bold text-slate-400">{inc.fecha}</span>
                          </div>
                          <p className="text-sm font-bold text-slate-600">{inc.detalle}</p>
                        </div>
                        <button onClick={() => eliminarIncidente(alumnoSeleccionado.id, inc.id)} className="text-slate-400 hover:text-rose-500 hover:bg-rose-50 h-fit p-2.5 rounded-[16px] transition-colors"><Trash2 className="w-5 h-5" /></button>
                      </div>
                    )) : (
                      <p className="text-center text-slate-400 font-bold py-6 bg-slate-50 rounded-[24px] border-[3px] border-dashed border-slate-200">No hay observaciones registradas.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {vista === 'reporte' && (
          <main className="mt-8 space-y-8 w-full max-w-[1000px] mx-auto pb-12">
            <div className="bg-white p-6 rounded-[30px] smooth-shadow border-[4px] border-white flex justify-between items-center print:hidden">
              <div className="flex items-center gap-4">
                <div className="p-4 bg-[#e0e7ff] text-[#4f46e5] rounded-[20px]"><Printer className="w-8 h-8" /></div>
                <div>
                  <h3 className="text-xl font-black text-[#1e1b4b]">Reporte Diario Formateado</h3>
                  <p className="text-sm font-bold text-slate-500">Listo para impresión en tamaño carta.</p>
                </div>
              </div>
              <button onClick={() => window.print()} className="bubbly-btn bg-[#4f46e5] hover:bg-[#4338ca] text-white font-black text-sm px-8 py-4 rounded-[20px] flex items-center gap-2 shadow-[0_8px_20px_rgba(79,70,229,0.3)]"><Printer className="w-5 h-5" /> Imprimir Documento</button>
            </div>

            <div className="bg-white text-black p-10 md:p-12 rounded-[40px] smooth-shadow border-[4px] border-white print:border-none print:shadow-none print:p-0 print:rounded-none">
              <header className="border-b-[4px] border-[#1e1b4b] pb-6 flex justify-between items-end">
                <div>
                  <h1 className="text-3xl font-black text-[#1e1b4b] uppercase tracking-tighter">Reporte de Grupo</h1>
                  <p className="text-base font-black text-[#4f46e5] mt-2">Tercer Grado de Primaria • Grupo "A"</p>
                </div>
                <div className="bg-slate-100 px-6 py-3 rounded-2xl">
                  <span className="block text-[10px] uppercase font-black text-slate-500 tracking-widest mb-1">FECHA</span>
                  <p className="text-sm font-black">{fecha}</p>
                </div>
              </header>

              <div className="grid grid-cols-3 gap-6 py-6 text-xs border-b-[3px] border-slate-100 print:border-slate-300 bg-slate-50 print:bg-white p-6 my-8 rounded-[30px] print:rounded-none">
                <div><span className="font-black text-slate-500 block text-[11px] uppercase tracking-widest mb-2">ASISTENCIA</span><p className="text-2xl font-black text-[#059669] print:text-black">{stats.porcentaje}% ({stats.presentes}/{stats.total})</p></div>
                <div><span className="font-black text-slate-500 block text-[11px] uppercase tracking-widest mb-2">TRABAJO CASA</span><p className="text-2xl font-black text-[#2563eb] print:text-black">{stats.trabajandoCasa} Alumnos</p></div>
                <div><span className="font-black text-slate-500 block text-[11px] uppercase tracking-widest mb-2">TAREAS ENTREGADAS</span><p className="text-2xl font-black text-[#4f46e5] print:text-black">{stats.tareasCumplidas} Alumnos</p></div>
              </div>

              <h3 className="text-sm font-black text-[#1e1b4b] uppercase mt-8 mb-4 border-b-[3px] border-slate-200 inline-block pb-1">I. Control Diario (Asistencia y Tareas)</h3>
              <table className="w-full text-left text-[13px] border-collapse font-bold">
                <thead><tr className="border-b-[4px] border-[#1e1b4b] text-[#1e1b4b] bg-slate-100 print:bg-slate-200"><th className="p-4 font-black w-12 rounded-tl-[20px]">N.L.</th><th className="p-4 font-black">Nombre del Alumno</th><th className="p-4 font-black text-center">Asistencia</th><th className="p-4 font-black text-center">Ubicación</th><th className="p-4 font-black text-center">Tarea</th><th className="p-4 font-black rounded-tr-[20px]">Canal</th></tr></thead>
                <tbody>{alumnos.map((al) => (<tr key={al.id} className="border-b-[3px] border-slate-50 print:border-slate-300 hover:bg-slate-50"><td className="p-3 print:text-slate-700 text-slate-400 font-black">{al.id}</td><td className="p-3 font-black text-[#1e1b4b] print:text-black">{al.nombre}</td><td className={`p-3 text-center font-black ${al.asistencia ? 'text-[#059669]' : 'text-rose-500'} print:text-black`}>{al.asistencia ? 'PRESENTE' : 'FALTÓ'}</td><td className="p-3 text-center">{al.asistencia ? al.lugar : '-'}</td><td className="p-3 text-center font-black">{al.asistencia ? (al.tarea ? 'CUMPLIÓ' : 'NADA') : '-'}</td><td className="p-3 uppercase text-[10px] font-black text-slate-500">{al.canal}</td></tr>))}</tbody>
              </table>

              <div className="print:break-inside-avoid print:mt-12 mt-12">
                <h3 className="text-sm font-black text-[#1e1b4b] uppercase mb-4 border-b-[3px] border-slate-200 inline-block pb-1">II. Bitácora de Observaciones</h3>
                <table className="w-full text-left text-[13px] border-collapse font-bold">
                  <thead><tr className="border-b-[4px] border-[#1e1b4b] text-[#1e1b4b] bg-slate-100 print:bg-slate-200"><th className="p-4 font-black w-1/4 rounded-tl-[20px]">Alumno</th><th className="p-4 font-black w-1/6">Categoría</th><th className="p-4 font-black rounded-tr-[20px]">Descripción</th></tr></thead>
                  <tbody>
                    {incidentesReporte.length > 0 ? incidentesReporte.map((item) => (<tr key={item.id} className="border-b-[3px] border-slate-50 print:border-slate-300 hover:bg-slate-50"><td className="p-3 font-black text-[#1e1b4b] print:text-black">{item.nombre}</td><td className="p-3 font-black uppercase text-[10px] text-[#d97706] print:text-slate-800">{item.categoria}</td><td className="p-3 print:text-black text-slate-600">{item.detalle}</td></tr>)) : <tr><td colSpan="3" className="p-8 text-center text-slate-400 font-black bg-slate-50 rounded-b-[20px] border-[3px] border-dashed border-slate-100">No hay observaciones registradas para este día.</td></tr>}
                  </tbody>
                </table>
              </div>

              <footer className="print:break-inside-avoid print:mt-24 mt-24 pt-10 flex justify-around text-[13px]">
                <div className="text-center w-64"><div className="border-t-[3px] border-[#1e1b4b] pt-3 uppercase font-black tracking-widest text-slate-500">Firma Docente</div><p className="mt-2 font-black text-[#1e1b4b]">Profr. Aristeo Maya Corona</p></div>
                <div className="text-center w-64"><div className="border-t-[3px] border-[#1e1b4b] pt-3 uppercase font-black tracking-widest text-slate-500">Vo. Bo. Dirección</div><p className="mt-2 font-black text-[#1e1b4b]">Profa. Rosa María Reynoso Gómez</p></div>
              </footer>
            </div>
          </main>
        )}

        {vista === 'formal' && (
          <main className="mt-8 w-full max-w-[900px] mx-auto pb-20">
            {!imprimirFormal ? (
              <div className="bg-white p-8 md:p-12 rounded-[40px] smooth-shadow border-[6px] border-amber-50 relative overflow-hidden print:hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-amber-50 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                
                <div className="border-b-[4px] border-slate-50 pb-6 mb-8 relative z-10">
                  <h2 className="text-3xl font-black text-[#d97706] flex items-center gap-3"><ShieldAlert className="w-10 h-10" /> Acta Circunstanciada</h2>
                  <p className="text-base font-bold text-slate-500 mt-2">Llene los datos de forma objetiva. El documento final tendrá formato oficial para impresión y firmas.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                  <div className="space-y-2">
                    <label className="text-[11px] uppercase tracking-widest font-black text-slate-500">Alumno Involucrado principal</label>
                    <select value={formFormal.idAlumno} onChange={e => setFormFormal({...formFormal, idAlumno: e.target.value})} className="w-full p-4 bg-slate-50 border-[3px] border-slate-100 rounded-[20px] text-base text-[#1e1b4b] outline-none focus:border-amber-400 font-black cursor-pointer">
                      <option value="">-- Seleccionar Alumno --</option>
                      {alumnos.map(al => <option key={al.id} value={al.id}>{al.nombre}</option>)}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] uppercase tracking-widest font-black text-slate-500">Hora del Incidente</label>
                    <input type="time" value={formFormal.hora} onChange={e => setFormFormal({...formFormal, hora: e.target.value})} className="w-full p-4 bg-slate-50 border-[3px] border-slate-100 rounded-[20px] text-base text-[#1e1b4b] outline-none focus:border-amber-400 font-black" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] uppercase tracking-widest font-black text-slate-500">Lugar Exacto</label>
                    <input type="text" placeholder="Ej. Patio escolar, Salón..." value={formFormal.lugar} onChange={e => setFormFormal({...formFormal, lugar: e.target.value})} className="w-full p-4 bg-slate-50 border-[3px] border-slate-100 rounded-[20px] text-base text-[#1e1b4b] outline-none focus:border-amber-400 font-bold" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] uppercase tracking-widest font-black text-slate-500">Testigos (Opcional)</label>
                    <input type="text" placeholder="Nombres..." value={formFormal.testigos} onChange={e => setFormFormal({...formFormal, testigos: e.target.value})} className="w-full p-4 bg-slate-50 border-[3px] border-slate-100 rounded-[20px] text-base text-[#1e1b4b] outline-none focus:border-amber-400 font-bold" />
                  </div>
                </div>

                <div className="space-y-4 pt-8 mt-4 border-t-[4px] border-slate-50 relative z-10">
                  <label className="text-sm uppercase tracking-widest font-black text-[#d97706] block mb-4">Categorización (Seleccione las aplicables)</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#fffbeb] p-6 rounded-[24px] border-[3px] border-[#fde68a]">
                    {opcionesFaltasForm.map((falta, idx) => (
                      <label key={idx} className="flex items-start gap-4 cursor-pointer hover:bg-amber-100 p-3 rounded-xl transition-colors">
                        <input type="checkbox" checked={formFormal.faltasSeleccionadas.includes(falta)} onChange={() => toggleFaltaFormal(falta)} className="mt-1 accent-amber-500 w-5 h-5" />
                        <span className="text-sm font-bold text-amber-900">{falta}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-8 pt-8 mt-4 relative z-10">
                  <div className="space-y-2">
                    <label className="text-[11px] uppercase tracking-widest font-black text-slate-500 flex justify-between">1. Descripción objetiva de los hechos</label>
                    <textarea placeholder="Narre cronológicamente qué sucedió..." value={formFormal.descripcion} onChange={e => setFormFormal({...formFormal, descripcion: e.target.value})} className="w-full p-5 bg-slate-50 border-[3px] border-slate-100 rounded-[24px] text-sm font-bold text-slate-700 outline-none focus:border-amber-400 min-h-[120px]" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] uppercase tracking-widest font-black text-slate-500">2. Acción Correctiva Inmediata</label>
                    <textarea placeholder="Ej. Se separó a los alumnos..." value={formFormal.accion} onChange={e => setFormFormal({...formFormal, accion: e.target.value})} className="w-full p-5 bg-slate-50 border-[3px] border-slate-100 rounded-[24px] text-sm font-bold text-slate-700 outline-none focus:border-amber-400 min-h-[100px]" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] uppercase tracking-widest font-black text-slate-500">3. Acuerdos / Seguimiento</label>
                    <textarea placeholder="Ej. Cita a padres..." value={formFormal.acuerdos} onChange={e => setFormFormal({...formFormal, acuerdos: e.target.value})} className="w-full p-5 bg-slate-50 border-[3px] border-slate-100 rounded-[24px] text-sm font-bold text-slate-700 outline-none focus:border-amber-400 min-h-[100px]" />
                  </div>
                </div>

                <button onClick={() => { if(!formFormal.idAlumno){ alert("Seleccione un alumno primero"); return; } setImprimirFormal(true); }} className="bubbly-btn w-full mt-10 bg-[#facc15] hover:bg-[#eab308] text-[#713f12] font-black text-lg py-5 rounded-[24px] flex items-center justify-center gap-3 shadow-[0_8px_25px_rgba(250,204,21,0.4)] relative z-10">
                  <Printer className="w-6 h-6" /> Generar Acta Oficial
                </button>
              </div>
            ) : (
              <div className="bg-white text-black w-full mx-auto p-12 md:p-16 shadow-2xl rounded-[10px] print:p-0 print:shadow-none print:w-full print:max-w-full relative min-h-[1000px] border">
                
                <div className="print:hidden flex justify-between mb-10 pb-6 border-b-2 border-slate-100">
                  <button onClick={() => setImprimirFormal(false)} className="text-slate-500 hover:text-[#1e1b4b] font-black text-sm px-6 py-3 border-2 border-slate-200 rounded-2xl transition-colors">← Volver al Editor</button>
                  <button onClick={() => window.print()} className="bg-[#facc15] hover:bg-[#eab308] text-[#713f12] font-black text-sm px-8 py-3 rounded-2xl flex items-center gap-2 shadow-lg transition-colors"><Printer className="w-5 h-5" /> Imprimir Acta Formal</button>
                </div>

                <header className="text-center mb-12 border-b-4 border-double border-slate-300 pb-8 print:break-inside-avoid">
                  <h2 className="text-2xl font-black uppercase tracking-widest text-slate-900 font-sans">Escuela Primaria "Vicente Guerrero"</h2>
                  <div className="text-sm font-bold text-slate-600 mt-4 space-y-1 font-sans">
                    <p>C.C.T.: 16DPR2428N</p>
                    <p>ZONA ESCOLAR: 307 &nbsp;&nbsp;&nbsp; SECTOR: 026</p>
                    <p>TURNO MATUTINO</p>
                    <p>Vicente Riva Palacio, Municipio de San Lucas, Michoacán.</p>
                  </div>
                  <div className="mt-12">
                    <h1 className="text-3xl font-black uppercase tracking-tight border-b-4 border-black inline-block pb-2 mb-4 font-sans">Acta Circunstanciada de Hechos</h1>
                    <p className="text-lg font-black uppercase mt-2 text-slate-700 font-sans">Tercer Grado &nbsp;•&nbsp; Grupo "A"</p>
                  </div>
                </header>

                <div className="space-y-8 text-base leading-relaxed font-semibold text-slate-800">
                  <p className="text-justify print:text-[14px] leading-loose">
                    En la localidad de <span className="font-black text-black">Vicente Riva Palacio, Municipio de San Lucas, Michoacán</span>, dentro de las instalaciones de la <span className="font-black text-black">Escuela Primaria "Vicente Guerrero"</span>, siendo las <span className="font-black text-black border-b-2 border-black px-4">{formFormal.hora || '______'}</span> horas del día <span className="font-black text-black border-b-2 border-black px-4">{fecha.split('-').reverse().join('/')}</span>, 
                    el docente titular <span className="font-black text-black">Profr. Aristeo Maya Corona</span> procede a levantar la presente acta para dejar constancia de los hechos ocurridos en <span className="font-black text-black border-b-2 border-black px-4">{formFormal.lugar}</span>, 
                    relacionados con el/la alumno(a):
                  </p>

                  <div className="bg-slate-100 p-6 font-black text-2xl text-center uppercase border-2 border-slate-300 print:break-inside-avoid text-black shadow-inner">
                    {alumnos.find(a => a.id === parseInt(formFormal.idAlumno))?.nombre || 'ALUMNO NO SELECCIONADO'}
                  </div>

                  {formFormal.testigos && (
                    <p className="print:break-inside-avoid"><span className="font-black text-black">En presencia de los testigos:</span> {formFormal.testigos}</p>
                  )}

                  {formFormal.faltasSeleccionadas.length > 0 && (
                    <div className="print:break-inside-avoid mt-8 bg-slate-50 p-6 rounded-lg border border-slate-200">
                      <h3 className="font-black uppercase text-sm mb-4 text-black">Categorías de la falta aplicables:</h3>
                      <ul className="list-disc pl-8 font-bold text-slate-700 space-y-2">
                        {formFormal.faltasSeleccionadas.map(f => <li key={f}>{f}</li>)}
                      </ul>
                    </div>
                  )}

                  <div className="print:break-inside-avoid mt-12">
                    <h3 className="font-black uppercase text-sm mb-4 border-b-2 border-black inline-block pb-1 text-black">1. Descripción objetiva de los hechos:</h3>
                    <p className="whitespace-pre-wrap print:text-[14px] leading-loose text-justify mt-4">{formFormal.descripcion || 'Sin descripción detallada.'}</p>
                  </div>

                  <div className="print:break-inside-avoid mt-12">
                    <h3 className="font-black uppercase text-sm mb-4 border-b-2 border-black inline-block pb-1 text-black">2. Acción Correctiva Inmediata:</h3>
                    <p className="whitespace-pre-wrap print:text-[14px] leading-loose text-justify mt-4">{formFormal.accion || 'No se registraron acciones inmediatas.'}</p>
                  </div>

                  <div className="print:break-inside-avoid mt-12">
                    <h3 className="font-black uppercase text-sm mb-4 border-b-2 border-black inline-block pb-1 text-black">3. Acuerdos y Seguimiento:</h3>
                    <p className="whitespace-pre-wrap print:text-[14px] leading-loose text-justify mt-4">{formFormal.acuerdos || 'No se registraron acuerdos específicos.'}</p>
                  </div>
                </div>

                <div className="print:break-inside-avoid print:mt-[120px] mt-[120px] mb-[100px]">
                  <p className="text-sm text-justify mb-32 font-bold italic text-slate-600 leading-relaxed max-w-4xl mx-auto">
                    La presente acta se lee a los involucrados, quienes manifiestan su entera conformidad con la descripción de los hechos y los acuerdos establecidos, firmando al calce para constancia y efectos legales o administrativos a que haya lugar.
                  </p>

                  <div className="grid grid-cols-2 gap-y-40 gap-x-16 text-center text-sm font-black uppercase w-full max-w-4xl mx-auto pb-[100px] text-black">
                    <div className="flex flex-col items-center justify-end">
                      <div className="border-t-[2px] border-black pt-4 w-full">Firma del Docente Titular</div>
                      <p className="capitalize font-bold text-slate-800 mt-3">Profr. Aristeo Maya Corona</p>
                    </div>
                    <div className="flex flex-col items-center justify-end">
                      <div className="border-t-[2px] border-black pt-4 w-full">Vo. Bo. Dirección Escolar</div>
                      <p className="capitalize font-bold text-slate-800 mt-3">Profa. Rosa María Reynoso Gómez</p>
                    </div>
                    <div className="col-span-2 flex flex-col items-center justify-end mt-10">
                      <div className="border-t-[2px] border-black pt-4 w-3/5 mb-12">Enterado: Firma del Padre, Madre o Tutor</div>
                      <span className="capitalize font-bold text-slate-500 text-xs border-b-2 border-slate-300 px-24 pb-2">Nombre completo y firma</span>
                    </div>
                  </div>
                </div>

                <div className="hidden print:block fixed bottom-0 left-0 right-0 text-center text-[10px] text-slate-500 font-black uppercase border-t-2 border-slate-300 pt-4 bg-white pb-6 w-full font-sans">
                  Acta Circunstanciada de Hechos &nbsp;|&nbsp; Esc. Prim. Vicente Guerrero &nbsp;|&nbsp; C.C.T. 16DPR2428N
                  <br/>
                  <span className="text-[9px] font-bold tracking-widest mt-2 block">Documento Oficial • Hoja de uso interno y confidencial</span>
                </div>
              </div>
            )}
          </main>
        )}
      </div>

      {vista !== 'formal' && (
        <div className="fixed bottom-0 left-0 right-0 p-5 bg-white/95 backdrop-blur-xl border-t-[4px] border-sky-100 shadow-[0_-10px_40px_rgba(0,0,0,0.08)] z-30 print:hidden w-full">
          <div className="w-full px-4 md:px-8 max-w-7xl mx-auto flex items-center justify-between gap-5">
            <div className="hidden lg:flex flex-col">
              <span className="text-[11px] text-slate-400 font-black uppercase tracking-widest">Estatus</span>
              <span className={`text-sm font-black flex items-center gap-2 ${estadoSync === 'error' ? 'text-rose-500' : 'text-[#059669]'}`}>
                <span className={`w-2.5 h-2.5 rounded-full animate-pulse ${estadoSync === 'error' ? 'bg-rose-500' : 'bg-[#059669]'}`}></span>
                {estadoSync === 'error' ? 'Error al contactar nube' : 'Historial Activo'}
              </span>
            </div>
            
            <div className="flex w-full lg:w-auto gap-4">
              {/* Botón de Sincronizar (Nuevo) */}
              <button 
                onClick={handleSincronizarNube} disabled={sincronizando}
                className={`flex-1 lg:flex-initial py-4 px-6 rounded-[24px] font-black flex items-center justify-center gap-2 transition-all duration-300 text-sm tracking-wide ${sincronizando ? 'bg-sky-100 text-sky-400' : estadoSync === 'ok' ? 'bg-[#059669] text-white' : 'bg-sky-50 text-[#4f46e5] border-[3px] border-sky-100 hover:bg-[#e0e7ff] hover:border-[#4f46e5]/30'}`}
                title="Sincronizar con Google Sheets (Requiere doGet configurado en tu script)"
              >
                {sincronizando ? <RefreshCw className="w-5 h-5 animate-spin" /> : estadoSync === 'ok' ? <CheckCircle2 className="w-5 h-5" /> : <CloudDownload className="w-5 h-5" />}
                <span className="hidden sm:inline">{sincronizando ? 'Sincronizando...' : estadoSync === 'ok' ? '¡Actualizado!' : 'Cargar de Nube'}</span>
              </button>

              {/* Botón de Guardar */}
              <button 
                onClick={handleGuardarEnSheets} disabled={guardado}
                className={`bubbly-btn flex-1 lg:flex-initial py-4 px-8 rounded-[24px] font-black flex items-center justify-center gap-3 transition-all duration-300 text-base tracking-wide ${guardado ? 'bg-[#059669] text-white' : 'bg-[#4f46e5] text-white hover:bg-[#4338ca] hover:-translate-y-1 shadow-[0_8px_25px_rgba(79,70,229,0.4)]'}`}
              >
                {guardado ? <><CheckCircle2 className="w-6 h-6 animate-bounce" /> ¡Guardado!</> : <><Save className="w-6 h-6" /> Guardar Avance</>}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}