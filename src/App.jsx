import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  Calendar, UserCheck, UserX, Home, School, BookOpen, Save, CheckCircle2, 
  Printer, Search, BookOpenCheck, AlertCircle, Plus, Trash2, X, FileText, Award, User,
  Lock, ShieldAlert, CloudDownload, RefreshCw
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
  "Falta de respeto a compañeros",
  "Agresión física (empujones, juegos bruscos)",
  "Uso de lenguaje inapropiado",
  "Interrupción constante del trabajo",
  "Daño al mobiliario o material",
  "Incumplimiento reiterado de tareas"
];

const CONTRASENA_CORRECTA = 'Profe2026'; 

// ==========================================
// ⚠️ PEGA AQUÍ TU NUEVA URL DE GOOGLE SCRIPT ⚠️
// ==========================================
const URL_GOOGLE_SCRIPT = 'https://script.google.com/macros/s/AKfycbyPGP_GNIOGTND86RWn5DEt6ZAqMLlEmTT3IZW6od3ZaJjS-Oz4yxmAuilhibUStwHM/exec'; 

export default function App() {
  const [estaAutenticado, setEstaAutenticado] = useState(false);
  const [contrasena, setContrasena] = useState('');
  const [errorLogin, setErrorLogin] = useState('');

  const [alumnos, setAlumnos] = useState(alumnosIniciales);
  const [fecha, setFecha] = useState(new Date().toISOString().split('T')[0]);
  const [busqueda, setBusqueda] = useState('');
  const [filtroCanal, setFiltroCanal] = useState('Todos');
  const [vista, setVista] = useState('registro'); 
  const [guardado, setGuardado] = useState(false);
  
  const [sincronizando, setSincronizando] = useState(false);
  const [estadoSync, setEstadoSync] = useState(''); 

  const [alumnoSeleccionado, setAlumnoSeleccionado] = useState(null);
  const [incidenteNuevo, setIncidenteNuevo] = useState({ categoria: 'Conducta', detalle: '' });
  const [idAlumnoIncidente, setIdAlumnoIncidente] = useState(null);

  const [formFormal, setFormFormal] = useState({
    idAlumno: '', lugar: 'Salón de clases', hora: '', testigos: '',
    faltasSeleccionadas: [], descripcion: '', accion: '', acuerdos: ''
  });
  const [imprimirFormal, setImprimirFormal] = useState(false);

  useEffect(() => {
    const historialGuardado = localStorage.getItem(`historial_3a_${fecha}`);
    if (historialGuardado) {
      setAlumnos(JSON.parse(historialGuardado));
    } else {
      setAlumnos(alumnosIniciales.map(al => ({
        ...al, asistencia: true, lugar: 'salon', tarea: true, incidentes: []
      })));
    }
    setEstadoSync(''); // Resetear estado al cambiar fecha
  }, [fecha]);

  const manejarIngreso = useCallback((e) => {
    e.preventDefault();
    if (contrasena === CONTRASENA_CORRECTA) {
      setEstaAutenticado(true);
    } else {
      setErrorLogin('Contraseña incorrecta. Intenta de nuevo.');
      setContrasena(''); 
    }
  }, [contrasena]);

  const handleGuardarEnSheets = async () => {
    setGuardado(true);
    localStorage.setItem(`historial_3a_${fecha}`, JSON.stringify(alumnos));
    
    try {
      const params = new URLSearchParams();
      params.append('data', JSON.stringify({ fecha, alumnos }));
      // POST hacia Google Apps Script usa 'no-cors' por defecto para evitar problemas
      await fetch(URL_GOOGLE_SCRIPT, { method: 'POST', mode: 'no-cors', body: params });
    } catch (error) {
      console.error("Error al enviar a Sheets:", error);
    }
    setTimeout(() => setGuardado(false), 2500);
  };

  const handleSincronizarNube = async () => {
    setSincronizando(true);
    setEstadoSync('');
    
    try {
      const response = await fetch(`${URL_GOOGLE_SCRIPT}?fecha=${fecha}`);
      const text = await response.text();
      
      try {
        const data = JSON.parse(text);
        if (data.status === 'ok' && data.alumnos) {
          setAlumnos(data.alumnos);
          localStorage.setItem(`historial_3a_${fecha}`, JSON.stringify(data.alumnos));
          setEstadoSync('ok');
        } else if (data.status === 'empty') {
          // No es error, simplemente no hay nada guardado ese día en la nube
          setEstadoSync('ok'); 
        } else {
          console.error("Servidor respondió con error:", data.error);
          setEstadoSync('error');
        }
      } catch(e) {
        console.error("No se pudo leer la respuesta de Google Sheets. Asegúrate de haber hecho una 'Nueva Implementación'.", text);
        setEstadoSync('error');
      }
    } catch (error) {
      console.error("Error de conexión a internet o bloqueo CORS:", error);
      setEstadoSync('error');
    }
    
    setTimeout(() => {
      setSincronizando(false);
      if(estadoSync !== 'error') setEstadoSync('');
    }, 3000);
  };

  const alumnosFiltrados = useMemo(() => {
    const busquedaLower = busqueda.toLowerCase();
    return alumnos.filter(alumno => 
      (filtroCanal === 'Todos' || alumno.canal === filtroCanal) &&
      (busquedaLower === '' || alumno.nombre.toLowerCase().includes(busquedaLower))
    );
  }, [alumnos, busqueda, filtroCanal]);

  const toggleAsistencia = useCallback((id) => setAlumnos(prev => prev.map(al => al.id === id ? { ...al, asistencia: !al.asistencia } : al)), []);
  const toggleLugar = useCallback((id) => setAlumnos(prev => prev.map(al => al.id === id ? { ...al, lugar: al.lugar === 'salon' ? 'casa' : 'salon' } : al)), []);
  const toggleTarea = useCallback((id) => setAlumnos(prev => prev.map(al => al.id === id ? { ...al, tarea: !al.tarea } : al)), []);

  const agregarIncidente = useCallback((id) => {
    if (!incidenteNuevo.detalle.trim()) return;
    const nuevoObj = { id: Date.now(), fecha: fecha, categoria: incidenteNuevo.categoria, detalle: incidenteNuevo.detalle };
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
    setFormFormal(prev => ({ ...prev, faltasSeleccionadas: prev.faltasSeleccionadas.includes(falta) ? prev.faltasSeleccionadas.filter(f => f !== falta) : [...prev.faltasSeleccionadas, falta] }));
  }, []);

  const stats = useMemo(() => {
    const total = alumnos.length;
    let pres = 0, tar = 0, casa = 0;
    alumnos.forEach(a => { if (a.asistencia) { pres++; if (a.tarea) tar++; if (a.lugar === 'casa') casa++; } });
    return { total, presentes: pres, faltas: total - pres, porcentaje: total > 0 ? Math.round((pres / total) * 100) : 0, tareasCumplidas: tar, trabajandoCasa: casa };
  }, [alumnos]);

  const incidentesReporte = useMemo(() => alumnos.flatMap(a => a.incidentes.map(inc => ({ nombre: a.nombre, ...inc }))), [alumnos]);

  if (!estaAutenticado) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 font-sans w-full absolute inset-0 overflow-hidden bg-[#e0f2fe]">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@600;700;800;900&display=swap');
          :root, body, #root { font-family: 'Nunito', sans-serif; }
          .cloud-bg {
            background-color: #e0f2fe; /* Light sky blue */
            background-image: url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 40 Q30 20 50 25 Q65 10 80 30 Q95 40 85 60 Q90 80 70 85 Q50 95 30 80 Q10 75 15 55 Q5 45 20 40 Z' fill='%23bae6fd' opacity='0.5'/%3E%3C/svg%3E");
            background-size: 150px 150px;
          }
        `}</style>
        
        <div className="cloud-bg absolute inset-0 z-0"></div>
        
        <div className="bg-white p-8 md:p-10 rounded-[35px] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.1)] max-w-md w-full text-center relative z-10 border-[6px] border-white ring-4 ring-sky-100">
          <div className="bg-[#4f46e5] w-24 h-24 rounded-[30px] flex items-center justify-center mx-auto mb-6 text-white shadow-[0_10px_25px_rgba(79,70,229,0.4)] rotate-3">
            <Lock className="w-12 h-12" />
          </div>
          
          <h2 className="text-3xl font-black text-[#1e1b4b] mb-2">Registro 3° "A"</h2>
          <p className="text-slate-500 text-sm mb-8 font-bold">Portal del Docente. Ingresa tu clave.</p>
          
          <form onSubmit={manejarIngreso} className="space-y-5">
            <input
              type="password"
              placeholder="•••••••••"
              value={contrasena}
              onChange={(e) => { setContrasena(e.target.value); setErrorLogin(''); }}
              autoFocus
              className="w-full p-4 border-[3px] border-sky-100 bg-sky-50 rounded-[20px] outline-none focus:border-[#4f46e5] focus:bg-white transition-all text-center text-2xl tracking-[0.3em] font-black text-[#1e1b4b] shadow-inner"
            />
            {errorLogin && <p className="text-rose-500 text-sm font-black animate-pulse bg-rose-50 py-2 rounded-xl">{errorLogin}</p>}
            <button 
              type="submit" 
              className="w-full bg-[#4f46e5] hover:bg-[#4338ca] text-white font-black py-4 rounded-[20px] transition-transform shadow-[0_8px_25px_rgba(79,70,229,0.3)] flex items-center justify-center gap-2 text-lg active:scale-95 hover:-translate-y-1"
            >
              <UserCheck className="w-6 h-6" /> Acceder
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-slate-700 pb-28 print:bg-white print:text-black print:p-0 print:pb-0 w-full selection:bg-[#4f46e5] selection:text-white relative">
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@600;700;800;900&display=swap');
        :root, body, #root { margin: 0; padding: 0; font-family: 'Nunito', sans-serif; background-color: #e0f2fe; }
        .cloud-pattern {
          background-image: url("data:image/svg+xml,%3Csvg width='140' height='140' viewBox='0 0 140 140' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M25 50 Q40 25 65 30 Q85 10 105 35 Q125 50 110 75 Q115 100 90 105 Q65 120 40 100 Q15 95 20 70 Q5 55 25 50 Z' fill='%23bae6fd' opacity='0.4'/%3E%3C/svg%3E");
          background-size: 180px 180px;
        }
        @media print {
          @page { size: letter; margin: 1.5cm 2cm; }
          body { background: white !important; }
          ::-webkit-scrollbar { display: none; }
        }
        .bubbly-btn { transition: all 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55); }
        .bubbly-btn:active { transform: scale(0.95); }
      `}</style>

      {/* Fondo de nubes */}
      <div className="cloud-pattern fixed inset-0 z-0 pointer-events-none"></div>

      <header className="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-30 print:hidden w-full border-b-[4px] border-sky-100">
        <div className="px-4 md:px-8 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 w-full max-w-[1400px] mx-auto">
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

      <div className="w-full px-4 md:px-8 max-w-[1400px] mx-auto relative z-10">
        
        {/* Navegación Principal */}
        <div className="mt-8 flex flex-wrap gap-4 print:hidden w-full">
          <button
            onClick={() => { setVista('registro'); setImprimirFormal(false); }}
            className={`flex-1 md:flex-initial bubbly-btn flex items-center justify-center gap-3 px-6 py-4 rounded-[24px] text-base font-black border-[3px] ${
              vista === 'registro' 
              ? 'bg-[#4f46e5] text-white border-[#4f46e5] shadow-[0_8px_25px_rgba(79,70,229,0.35)] -translate-y-1' 
              : 'bg-white text-slate-500 hover:text-[#4f46e5] border-white hover:border-sky-100 shadow-sm'
            }`}
          >
            <BookOpenCheck className="w-6 h-6" /> Pase de Lista
          </button>
          
          <button
            onClick={() => { setVista('reporte'); setImprimirFormal(false); }}
            className={`flex-1 md:flex-initial bubbly-btn flex items-center justify-center gap-3 px-6 py-4 rounded-[24px] text-base font-black border-[3px] ${
              vista === 'reporte' 
              ? 'bg-[#4f46e5] text-white border-[#4f46e5] shadow-[0_8px_25px_rgba(79,70,229,0.35)] -translate-y-1' 
              : 'bg-white text-slate-500 hover:text-[#4f46e5] border-white hover:border-sky-100 shadow-sm'
            }`}
          >
            <Printer className="w-6 h-6" /> Reporte Diario
          </button>

          <button
            onClick={() => setVista('formal')}
            className={`flex-1 md:flex-initial bubbly-btn flex items-center justify-center gap-3 px-6 py-4 rounded-[24px] text-base font-black border-[3px] ${
              vista === 'formal' 
              ? 'bg-[#fbbf24] text-[#713f12] border-[#fbbf24] shadow-[0_8px_25px_rgba(251,191,36,0.4)] -translate-y-1' 
              : 'bg-white text-slate-500 hover:text-[#fbbf24] border-white hover:border-amber-100 shadow-sm'
            }`}
          >
            <ShieldAlert className="w-6 h-6" /> Bitácora / Acta
          </button>
        </div>

        {}
        {vista === 'registro' && (
          <section className="mt-8 print:hidden w-full">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 w-full">
              <div className="bg-white p-5 rounded-[28px] shadow-sm border-[3px] border-white flex items-center gap-4">
                <div className="p-4 bg-[#d1fae5] text-[#059669] rounded-[20px]"><UserCheck className="w-7 h-7" /></div>
                <div>
                  <p className="text-[11px] uppercase tracking-widest text-slate-400 font-black mb-1">Asistencia</p>
                  <p className="text-2xl font-black text-[#059669]">{stats.porcentaje}% <span className="text-xs font-bold text-slate-400">({stats.presentes}/{stats.total})</span></p>
                </div>
              </div>
              <div className="bg-white p-5 rounded-[28px] shadow-sm border-[3px] border-white flex items-center gap-4">
                <div className="p-4 bg-[#ffe4e6] text-[#e11d48] rounded-[20px]"><UserX className="w-7 h-7" /></div>
                <div>
                  <p className="text-[11px] uppercase tracking-widest text-slate-400 font-black mb-1">Faltas</p>
                  <p className="text-2xl font-black text-[#e11d48]">{stats.faltas} <span className="text-xs font-bold text-slate-400">alumnos</span></p>
                </div>
              </div>
              <div className="bg-white p-5 rounded-[28px] shadow-sm border-[3px] border-white flex items-center gap-4">
                <div className="p-4 bg-[#fef3c7] text-[#d97706] rounded-[20px]"><Home className="w-7 h-7" /></div>
                <div>
                  <p className="text-[11px] uppercase tracking-widest text-slate-400 font-black mb-1">En Casa</p>
                  <p className="text-2xl font-black text-[#d97706]">{stats.trabajandoCasa} <span className="text-xs font-bold text-slate-400">hoy</span></p>
                </div>
              </div>
              <div className="bg-white p-5 rounded-[28px] shadow-sm border-[3px] border-white flex items-center gap-4">
                <div className="p-4 bg-[#e0e7ff] text-[#4f46e5] rounded-[20px]"><BookOpen className="w-7 h-7" /></div>
                <div>
                  <p className="text-[11px] uppercase tracking-widest text-slate-400 font-black mb-1">Tareas</p>
                  <p className="text-2xl font-black text-[#4f46e5]">{stats.tareasCumplidas} <span className="text-xs font-bold text-slate-400">entregas</span></p>
                </div>
              </div>
            </div>
          </section>
        )}

        {vista === 'registro' && (
          <main className="mt-8 space-y-6 print:hidden w-full">
            <div className="bg-white p-4 rounded-[28px] shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center w-full border-[3px] border-white">
              <div className="relative flex-1 w-full max-w-lg">
                <Search className="w-6 h-6 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input 
                  type="text" placeholder="Buscar por nombre..." value={busqueda} onChange={(e) => setBusqueda(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-sky-50 border-[3px] border-sky-50 rounded-[20px] text-sm font-black text-[#1e1b4b] outline-none focus:border-sky-200 focus:bg-white transition-all"
                />
              </div>
              <div className="flex items-center gap-3 w-full md:w-auto bg-sky-50 p-1.5 rounded-[20px] border-[3px] border-sky-50">
                <span className="text-xs text-slate-400 font-black uppercase pl-3">Canal:</span>
                <select
                  value={filtroCanal} onChange={(e) => setFiltroCanal(e.target.value)}
                  className="bg-white border-none rounded-[16px] text-sm font-black py-2.5 px-4 text-[#4f46e5] outline-none w-full md:w-auto shadow-sm cursor-pointer"
                >
                  <option value="Todos">Todos</option><option value="Visual">Visual</option><option value="Auditivo">Auditivo</option><option value="Kinestésico">Kinestésico</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5 w-full pb-10">
              {alumnosFiltrados.length > 0 ? (
                alumnosFiltrados.map((alumno) => (
                  <div 
                    key={alumno.id}
                    className={`bg-white rounded-[32px] p-5 shadow-sm border-[4px] transition-all duration-300 flex flex-col gap-4 relative hover:-translate-y-1 hover:shadow-md ${
                      alumno.asistencia ? 'border-white' : 'border-rose-100 bg-rose-50/30'
                    }`}
                  >
                    <div className="absolute -right-2 -top-2 w-12 h-12 bg-sky-50 rounded-full flex items-center justify-center text-lg font-black text-sky-300 pointer-events-none">
                      {alumno.id}
                    </div>

                    <div className="flex justify-between items-start gap-2 relative z-10 pr-6">
                      <div className="flex-1 min-w-0">
                        <h2 className="text-[15px] font-black text-[#1e1b4b] leading-snug break-words mb-2">{alumno.nombre}</h2>
                        <span className={`px-2.5 py-1 text-[10px] font-black rounded-lg uppercase tracking-wider ${
                          alumno.canal === 'Visual' ? 'bg-[#e0e7ff] text-[#4f46e5]' : alumno.canal === 'Auditivo' ? 'bg-[#fce7f3] text-[#be185d]' : 'bg-[#fef3c7] text-[#d97706]'
                        }`}>{alumno.canal}</span>
                      </div>
                      <button onClick={() => setAlumnoSeleccionado(alumno)} className="p-2.5 bg-sky-50 text-slate-400 hover:text-[#4f46e5] rounded-[16px] transition-colors shrink-0" title="Ver Perfil">
                        <User className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-3 gap-2 mt-auto relative z-10">
                      <button onClick={() => toggleAsistencia(alumno.id)} className={`bubbly-btn flex flex-col items-center justify-center p-2.5 rounded-[18px] border-[3px] ${alumno.asistencia ? 'bg-[#ecfdf5] text-[#059669] border-[#a7f3d0]' : 'bg-rose-50 text-rose-500 border-rose-200'}`}>
                        {alumno.asistencia ? <UserCheck className="w-5 h-5 mb-1" /> : <UserX className="w-5 h-5 mb-1" />}
                        <span className="text-[9px] font-black tracking-wide">{alumno.asistencia ? 'PRESENTE' : 'FALTÓ'}</span>
                      </button>
                      <button onClick={() => toggleLugar(alumno.id)} disabled={!alumno.asistencia} className={`bubbly-btn flex flex-col items-center justify-center p-2.5 rounded-[18px] border-[3px] ${!alumno.asistencia ? 'opacity-40 cursor-not-allowed bg-slate-50 border-slate-200 text-slate-400' : alumno.lugar === 'salon' ? 'bg-[#eff6ff] text-[#3b82f6] border-[#bfdbfe]' : 'bg-[#fffbeb] text-[#d97706] border-[#fde68a]'}`}>
                        {alumno.lugar === 'salon' ? <School className="w-5 h-5 mb-1" /> : <Home className="w-5 h-5 mb-1" />}
                        <span className="text-[9px] font-black tracking-wide">{alumno.lugar === 'salon' ? 'SALÓN' : 'CASA'}</span>
                      </button>
                      <button onClick={() => toggleTarea(alumno.id)} disabled={!alumno.asistencia} className={`bubbly-btn flex flex-col items-center justify-center p-2.5 rounded-[18px] border-[3px] ${!alumno.asistencia ? 'opacity-40 cursor-not-allowed bg-slate-50 border-slate-200 text-slate-400' : alumno.tarea ? 'bg-[#faf5ff] text-[#9333ea] border-[#e9d5ff]' : 'bg-slate-50 text-slate-400 border-slate-200'}`}>
                        <BookOpen className="w-5 h-5 mb-1" />
                        <span className="text-[9px] font-black tracking-wide">{alumno.tarea ? 'CUMPLIÓ' : 'NADA'}</span>
                      </button>
                    </div>

                    <div className="border-t-[3px] border-slate-50 pt-3 relative z-10">
                      {idAlumnoIncidente === alumno.id ? (
                        <div className="space-y-2 bg-sky-50 p-3 rounded-[20px] border-[3px] border-sky-100">
                          <div className="flex gap-2">
                            <select value={incidenteNuevo.categoria} onChange={(e) => setIncidenteNuevo({ ...incidenteNuevo, categoria: e.target.value })} className="text-[11px] font-black p-2 bg-white border-[3px] border-sky-100 rounded-xl text-slate-600 outline-none flex-1">
                              <option value="Conducta">Conducta</option><option value="Académico">Académico</option><option value="Emocional">Emocional</option><option value="Salud">Salud</option>
                            </select>
                            <button onClick={() => setIdAlumnoIncidente(null)} className="text-slate-400 hover:text-rose-500 shrink-0 bg-white p-2 rounded-xl border-[3px] border-sky-100"><X className="w-4 h-4" /></button>
                          </div>
                          <textarea placeholder="Detalle..." value={incidenteNuevo.detalle} onChange={(e) => setIncidenteNuevo({ ...incidenteNuevo, detalle: e.target.value })} className="w-full text-[11px] font-bold p-2 bg-white text-slate-700 border-[3px] border-sky-100 rounded-xl outline-none resize-none h-12" />
                          <button onClick={() => agregarIncidente(alumno.id)} className="w-full bg-[#4f46e5] text-white text-[11px] py-2 rounded-xl font-black flex items-center justify-center gap-1">
                            <Plus className="w-4 h-4" /> Guardar
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between">
                          <button onClick={() => setIdAlumnoIncidente(alumno.id)} className="text-[11px] text-[#4f46e5] hover:bg-sky-50 px-2 py-1 rounded-xl flex items-center gap-1 font-black transition-colors"><Plus className="w-3.5 h-3.5" /> Nueva Nota</button>
                          {alumno.incidentes.length > 0 && <span className="flex items-center gap-1 text-[10px] bg-[#fef3c7] text-[#b45309] px-2 py-1 rounded-xl font-black"><AlertCircle className="w-3 h-3" /> {alumno.incidentes.length}</span>}
                        </div>
                      )}
                      {alumno.incidentes.length > 0 && idAlumnoIncidente !== alumno.id && (
                        <div className="mt-2 space-y-1.5">
                          {alumno.incidentes.slice(0, 1).map((inc) => (
                            <div key={inc.id} className="text-[10px] font-bold bg-[#fffbeb] p-2.5 rounded-[14px] border-[2px] border-[#fde68a] flex items-start gap-2">
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
                <div className="col-span-full bg-white rounded-[32px] p-12 text-center shadow-sm">
                  <p className="text-slate-400 font-black text-lg">No se encontraron alumnos.</p>
                </div>
              )}
            </div>
          </main>
        )}

        {alumnoSeleccionado && (
          <div className="fixed inset-0 bg-[#1e1b4b]/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 print:hidden">
            <div className="bg-white rounded-[35px] max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border-[6px] border-white ring-4 ring-sky-50">
              <header className="p-6 border-b-[3px] border-sky-50 flex items-center justify-between sticky top-0 bg-white z-10 rounded-t-[29px]">
                <div className="flex items-center gap-3">
                  <span className="p-3 bg-sky-100 text-[#4f46e5] rounded-[18px]"><User className="w-6 h-6" /></span>
                  <div><h3 className="text-xl font-black text-[#1e1b4b]">Ficha Técnica</h3></div>
                </div>
                <button onClick={() => setAlumnoSeleccionado(null)} className="p-2 text-slate-400 hover:bg-rose-50 hover:text-rose-500 rounded-full transition-colors"><X className="w-6 h-6" /></button>
              </header>

              <div className="p-6 space-y-6">
                <div className="bg-sky-50 p-5 rounded-[24px] border-[3px] border-sky-100 space-y-5">
                  <div>
                    <label className="text-[11px] uppercase tracking-widest font-black text-slate-400">Nombre</label>
                    <p className="text-lg font-black text-[#1e1b4b] leading-tight">{alumnoSeleccionado.nombre}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] uppercase tracking-widest font-black text-slate-400">Canal</label>
                      <select value={alumnoSeleccionado.canal} onChange={(e) => guardarPerfilPedagogico(alumnoSeleccionado.id, e.target.value, alumnoSeleccionado.diagnostico)} className="w-full mt-1 p-3 bg-white border-[3px] border-white rounded-[16px] text-sm font-black text-[#4f46e5] outline-none shadow-sm cursor-pointer">
                        <option value="Visual">Visual</option><option value="Auditivo">Auditivo</option><option value="Kinestésico">Kinestésico</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[11px] uppercase tracking-widest font-black text-slate-400">Ubicación Actual</label>
                      <div className={`mt-1 p-3 rounded-[16px] border-[3px] border-white flex items-center gap-2 text-xs font-black uppercase bg-white shadow-sm ${alumnoSeleccionado.lugar === 'salon' ? 'text-[#3b82f6]' : 'text-[#d97706]'}`}>
                        {alumnoSeleccionado.lugar === 'salon' ? <School className="w-4 h-4" /> : <Home className="w-4 h-4" />}
                        {alumnoSeleccionado.lugar === 'salon' ? 'Salón' : 'Casa'}
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="text-[11px] uppercase tracking-widest font-black text-slate-400">Notas Docente</label>
                    <textarea value={alumnoSeleccionado.diagnostico} onChange={(e) => guardarPerfilPedagogico(alumnoSeleccionado.id, alumnoSeleccionado.canal, e.target.value)} className="w-full mt-1 p-3 text-sm font-bold bg-white text-slate-600 border-[3px] border-white rounded-[16px] outline-none shadow-sm h-20 resize-none" />
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm font-black text-[#1e1b4b] uppercase tracking-wider flex items-center gap-2"><FileText className="w-5 h-5 text-[#4f46e5]" /> Historial de Notas</h4>
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                    {alumnoSeleccionado.incidentes.length > 0 ? alumnoSeleccionado.incidentes.map((inc) => (
                      <div key={inc.id} className="p-4 bg-white shadow-sm rounded-[20px] border-[3px] border-sky-50 flex justify-between gap-3">
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[9px] font-black bg-[#fef3c7] text-[#b45309] px-2.5 py-1 rounded-lg uppercase tracking-wider">{inc.categoria}</span>
                            <span className="text-[10px] font-bold text-slate-400">{inc.fecha}</span>
                          </div>
                          <p className="text-xs font-bold text-slate-600">{inc.detalle}</p>
                        </div>
                        <button onClick={() => eliminarIncidente(alumnoSeleccionado.id, inc.id)} className="text-slate-300 hover:text-rose-500 hover:bg-rose-50 h-fit p-2 rounded-[12px] transition-colors"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    )) : (
                      <p className="text-center text-slate-400 font-bold py-6 bg-slate-50 rounded-[20px] border-[3px] border-dashed border-slate-200">No hay registros.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {}
        {vista === 'reporte' && (
          <main className="mt-8 space-y-6 w-full max-w-[1000px] mx-auto pb-12">
            <div className="bg-white p-5 rounded-[28px] shadow-sm border-[3px] border-white flex justify-between items-center print:hidden">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-[#e0e7ff] text-[#4f46e5] rounded-[16px]"><Printer className="w-6 h-6" /></div>
                <div><h3 className="text-lg font-black text-[#1e1b4b]">Reporte Diario</h3></div>
              </div>
              <button onClick={() => window.print()} className="bubbly-btn bg-[#4f46e5] hover:bg-[#4338ca] text-white font-black text-sm px-6 py-3 rounded-[18px] flex items-center gap-2 shadow-md"><Printer className="w-4 h-4" /> Imprimir</button>
            </div>

            <div className="bg-white text-black p-10 rounded-[35px] shadow-md border-[4px] border-white print:border-none print:shadow-none print:p-0 print:rounded-none">
              <header className="border-b-[4px] border-[#1e1b4b] pb-4 flex justify-between items-end">
                <div>
                  <h1 className="text-2xl font-black text-[#1e1b4b] uppercase">Reporte de Grupo</h1>
                  <p className="text-sm font-black text-[#4f46e5] mt-1">Tercer Grado de Primaria • Grupo "A"</p>
                </div>
                <div className="bg-slate-100 px-5 py-2.5 rounded-[16px]">
                  <span className="block text-[9px] uppercase font-black text-slate-500 tracking-widest mb-0.5">FECHA</span>
                  <p className="text-sm font-black">{fecha}</p>
                </div>
              </header>

              <div className="grid grid-cols-3 gap-5 py-5 text-xs border-b-[3px] border-slate-100 print:border-slate-300 bg-slate-50 print:bg-white p-5 my-6 rounded-[24px] print:rounded-none">
                <div><span className="font-black text-slate-500 block text-[10px] uppercase tracking-widest mb-1">ASISTENCIA</span><p className="text-xl font-black text-[#059669] print:text-black">{stats.porcentaje}% ({stats.presentes}/{stats.total})</p></div>
                <div><span className="font-black text-slate-500 block text-[10px] uppercase tracking-widest mb-1">TRABAJO CASA</span><p className="text-xl font-black text-[#3b82f6] print:text-black">{stats.trabajandoCasa} Alumnos</p></div>
                <div><span className="font-black text-slate-500 block text-[10px] uppercase tracking-widest mb-1">TAREAS RECIBIDAS</span><p className="text-xl font-black text-[#4f46e5] print:text-black">{stats.tareasCumplidas} Alumnos</p></div>
              </div>

              <h3 className="text-xs font-black text-[#1e1b4b] uppercase mt-6 mb-3 border-b-[3px] border-slate-200 inline-block pb-1">I. Control de Asistencia y Tareas</h3>
              <table className="w-full text-left text-[12px] border-collapse font-bold">
                <thead><tr className="border-b-[3px] border-[#1e1b4b] bg-slate-100 print:bg-slate-200"><th className="p-3 font-black w-10 rounded-tl-[16px]">N.L.</th><th className="p-3 font-black">Nombre</th><th className="p-3 font-black text-center">Asistencia</th><th className="p-3 font-black text-center">Lugar</th><th className="p-3 font-black text-center">Tarea</th><th className="p-3 font-black rounded-tr-[16px]">Canal</th></tr></thead>
                <tbody>{alumnos.map((al) => (<tr key={al.id} className="border-b-[2px] border-slate-50 print:border-slate-300"><td className="p-2.5 print:text-slate-700 text-slate-400 font-black">{al.id}</td><td className="p-2.5 font-black text-[#1e1b4b] print:text-black">{al.nombre}</td><td className={`p-2.5 text-center font-black ${al.asistencia ? 'text-[#059669]' : 'text-rose-500'} print:text-black`}>{al.asistencia ? 'PRESENTE' : 'FALTÓ'}</td><td className="p-2.5 text-center">{al.asistencia ? al.lugar : '-'}</td><td className="p-2.5 text-center font-black">{al.asistencia ? (al.tarea ? 'CUMPLIÓ' : 'NADA') : '-'}</td><td className="p-2.5 uppercase text-[9px] font-black text-slate-500">{al.canal}</td></tr>))}</tbody>
              </table>

              <div className="print:break-inside-avoid print:mt-10 mt-10">
                <h3 className="text-xs font-black text-[#1e1b4b] uppercase mb-3 border-b-[3px] border-slate-200 inline-block pb-1">II. Registro de Observaciones</h3>
                <table className="w-full text-left text-[12px] border-collapse font-bold">
                  <thead><tr className="border-b-[3px] border-[#1e1b4b] bg-slate-100 print:bg-slate-200"><th className="p-3 font-black w-1/4 rounded-tl-[16px]">Alumno</th><th className="p-3 font-black w-1/6">Tipo</th><th className="p-3 font-black rounded-tr-[16px]">Descripción</th></tr></thead>
                  <tbody>
                    {incidentesReporte.length > 0 ? incidentesReporte.map((item) => (<tr key={item.id} className="border-b-[2px] border-slate-50 print:border-slate-300"><td className="p-2.5 font-black text-[#1e1b4b] print:text-black">{item.nombre}</td><td className="p-2.5 font-black uppercase text-[9px] text-[#d97706] print:text-slate-800">{item.categoria}</td><td className="p-2.5 print:text-black text-slate-600">{item.detalle}</td></tr>)) : <tr><td colSpan="3" className="p-6 text-center text-slate-400 font-black bg-slate-50 rounded-b-[16px] border-[3px] border-dashed border-slate-100">Sin observaciones registradas hoy.</td></tr>}
                  </tbody>
                </table>
              </div>

              <footer className="print:break-inside-avoid print:mt-20 mt-20 pt-8 flex justify-around text-[12px]">
                <div className="text-center w-56"><div className="border-t-[3px] border-[#1e1b4b] pt-2 uppercase font-black tracking-widest text-slate-500">Firma Docente</div><p className="mt-1 font-black text-[#1e1b4b]">Profr. Aristeo Maya Corona</p></div>
                <div className="text-center w-56"><div className="border-t-[3px] border-[#1e1b4b] pt-2 uppercase font-black tracking-widest text-slate-500">Vo. Bo. Dirección</div><p className="mt-1 font-black text-[#1e1b4b]">Profa. Rosa M. Reynoso Gómez</p></div>
              </footer>
            </div>
          </main>
        )}

        {vista === 'formal' && (
          <main className="mt-8 w-full max-w-[900px] mx-auto pb-20">
            {!imprimirFormal ? (
              <div className="bg-white p-8 md:p-10 rounded-[35px] shadow-sm border-[4px] border-white relative overflow-hidden print:hidden">
                <div className="border-b-[4px] border-slate-50 pb-5 mb-6">
                  <h2 className="text-2xl font-black text-[#fbbf24] flex items-center gap-3"><ShieldAlert className="w-8 h-8" /> Generador de Acta</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[11px] uppercase tracking-widest font-black text-slate-400">Alumno Principal</label>
                    <select value={formFormal.idAlumno} onChange={e => setFormFormal({...formFormal, idAlumno: e.target.value})} className="w-full p-4 bg-sky-50 border-[3px] border-sky-50 rounded-[20px] text-sm text-[#1e1b4b] outline-none focus:border-amber-300 font-black cursor-pointer">
                      <option value="">-- Seleccionar --</option>
                      {alumnos.map(al => <option key={al.id} value={al.id}>{al.nombre}</option>)}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] uppercase tracking-widest font-black text-slate-400">Hora</label>
                    <input type="time" value={formFormal.hora} onChange={e => setFormFormal({...formFormal, hora: e.target.value})} className="w-full p-4 bg-sky-50 border-[3px] border-sky-50 rounded-[20px] text-sm text-[#1e1b4b] outline-none focus:border-amber-300 font-black" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] uppercase tracking-widest font-black text-slate-400">Lugar de los Hechos</label>
                    <input type="text" placeholder="Ej. Salón de clases..." value={formFormal.lugar} onChange={e => setFormFormal({...formFormal, lugar: e.target.value})} className="w-full p-4 bg-sky-50 border-[3px] border-sky-50 rounded-[20px] text-sm text-[#1e1b4b] outline-none focus:border-amber-300 font-bold" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] uppercase tracking-widest font-black text-slate-400">Testigos (Opcional)</label>
                    <input type="text" placeholder="Nombres..." value={formFormal.testigos} onChange={e => setFormFormal({...formFormal, testigos: e.target.value})} className="w-full p-4 bg-sky-50 border-[3px] border-sky-50 rounded-[20px] text-sm text-[#1e1b4b] outline-none focus:border-amber-300 font-bold" />
                  </div>
                </div>

                <div className="space-y-3 pt-6 mt-6 border-t-[4px] border-slate-50">
                  <label className="text-[11px] uppercase tracking-widest font-black text-amber-500 block">Categorías Rápidas</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-[#fffbeb] p-5 rounded-[24px] border-[3px] border-[#fde68a]">
                    {opcionesFaltasForm.map((falta, idx) => (
                      <label key={idx} className="flex items-start gap-3 cursor-pointer hover:bg-amber-100 p-2 rounded-[12px] transition-colors">
                        <input type="checkbox" checked={formFormal.faltasSeleccionadas.includes(falta)} onChange={() => toggleFaltaFormal(falta)} className="mt-1 accent-amber-500 w-4 h-4" />
                        <span className="text-xs font-bold text-amber-900">{falta}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-6 pt-6 mt-6 border-t-[4px] border-slate-50">
                  <div className="space-y-2">
                    <label className="text-[11px] uppercase tracking-widest font-black text-slate-400">1. Hechos Objetivos</label>
                    <textarea value={formFormal.descripcion} onChange={e => setFormFormal({...formFormal, descripcion: e.target.value})} className="w-full p-4 bg-sky-50 border-[3px] border-sky-50 rounded-[20px] text-sm font-bold text-slate-700 outline-none focus:border-amber-300 h-24 resize-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] uppercase tracking-widest font-black text-slate-400">2. Acción Inmediata</label>
                    <textarea value={formFormal.accion} onChange={e => setFormFormal({...formFormal, accion: e.target.value})} className="w-full p-4 bg-sky-50 border-[3px] border-sky-50 rounded-[20px] text-sm font-bold text-slate-700 outline-none focus:border-amber-300 h-20 resize-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] uppercase tracking-widest font-black text-slate-400">3. Acuerdos / Sanción</label>
                    <textarea value={formFormal.acuerdos} onChange={e => setFormFormal({...formFormal, acuerdos: e.target.value})} className="w-full p-4 bg-sky-50 border-[3px] border-sky-50 rounded-[20px] text-sm font-bold text-slate-700 outline-none focus:border-amber-300 h-20 resize-none" />
                  </div>
                </div>

                <button onClick={() => { if(!formFormal.idAlumno){ alert("Selecciona un alumno."); return; } setImprimirFormal(true); }} className="bubbly-btn w-full mt-8 bg-[#fbbf24] text-[#713f12] font-black text-base py-4 rounded-[20px] flex items-center justify-center gap-2 shadow-md">
                  <Printer className="w-5 h-5" /> Vista Previa Documento
                </button>
              </div>
            ) : (
              <div className="bg-white text-black w-full mx-auto p-12 shadow-md rounded-[10px] print:p-0 print:shadow-none min-h-[1000px] border border-slate-200">
                <div className="print:hidden flex justify-between mb-8 pb-4 border-b-2 border-slate-100">
                  <button onClick={() => setImprimirFormal(false)} className="text-slate-500 font-black text-sm px-5 py-2 border-2 border-slate-200 rounded-[14px]">← Regresar</button>
                  <button onClick={() => window.print()} className="bg-[#fbbf24] text-[#713f12] font-black text-sm px-6 py-2 rounded-[14px] flex items-center gap-2 shadow-md"><Printer className="w-4 h-4" /> Imprimir Oficial</button>
                </div>
                
                {/* Contenido del acta oficial (sin cambios mayores) */}
                <header className="text-center mb-10 border-b-4 border-double border-slate-300 pb-6 print:break-inside-avoid">
                  <h2 className="text-xl font-black uppercase tracking-widest text-slate-900 font-sans">Escuela Primaria "Vicente Guerrero"</h2>
                  <div className="text-xs font-bold text-slate-600 mt-2 space-y-1 font-sans">
                    <p>C.C.T.: 16DPR2428N | ZONA: 307 | SECTOR: 026</p>
                    <p>Vicente Riva Palacio, San Lucas, Michoacán.</p>
                  </div>
                  <div className="mt-8">
                    <h1 className="text-2xl font-black uppercase border-b-4 border-black inline-block pb-1 mb-2 font-sans">Acta Circunstanciada</h1>
                    <p className="text-sm font-black uppercase mt-1 text-slate-700 font-sans">Tercer Grado "A"</p>
                  </div>
                </header>

                <div className="space-y-6 text-[13px] leading-relaxed font-semibold text-slate-800">
                  <p className="text-justify leading-loose">
                    En <span className="font-black text-black">Vicente Riva Palacio, Mich.</span>, en la <span className="font-black text-black">Escuela "Vicente Guerrero"</span>, siendo las <span className="font-black text-black border-b-2 border-black px-2">{formFormal.hora || '___:___'}</span> hrs del <span className="font-black text-black border-b-2 border-black px-2">{fecha.split('-').reverse().join('/')}</span>, 
                    el docente <span className="font-black text-black">Profr. Aristeo Maya Corona</span> levanta acta por los hechos en <span className="font-black text-black border-b-2 border-black px-2">{formFormal.lugar}</span>, 
                    relacionados con:
                  </p>

                  <div className="bg-slate-100 p-4 font-black text-lg text-center uppercase border-2 border-slate-300 print:break-inside-avoid text-black shadow-inner">
                    {alumnos.find(a => a.id === parseInt(formFormal.idAlumno))?.nombre}
                  </div>

                  {formFormal.testigos && <p className="print:break-inside-avoid"><span className="font-black text-black">Testigos:</span> {formFormal.testigos}</p>}
                  
                  {formFormal.faltasSeleccionadas.length > 0 && (
                    <div className="print:break-inside-avoid mt-6">
                      <h3 className="font-black uppercase text-xs mb-2 text-black">Categorías:</h3>
                      <ul className="list-disc pl-6 font-bold text-slate-700">{formFormal.faltasSeleccionadas.map(f => <li key={f}>{f}</li>)}</ul>
                    </div>
                  )}

                  <div className="print:break-inside-avoid mt-8"><h3 className="font-black uppercase text-xs mb-2 border-b-2 border-black inline-block pb-1 text-black">1. Hechos:</h3><p className="whitespace-pre-wrap leading-loose text-justify mt-2">{formFormal.descripcion}</p></div>
                  <div className="print:break-inside-avoid mt-8"><h3 className="font-black uppercase text-xs mb-2 border-b-2 border-black inline-block pb-1 text-black">2. Acción Inmediata:</h3><p className="whitespace-pre-wrap leading-loose text-justify mt-2">{formFormal.accion}</p></div>
                  <div className="print:break-inside-avoid mt-8"><h3 className="font-black uppercase text-xs mb-2 border-b-2 border-black inline-block pb-1 text-black">3. Acuerdos:</h3><p className="whitespace-pre-wrap leading-loose text-justify mt-2">{formFormal.acuerdos}</p></div>
                </div>

                <div className="print:break-inside-avoid mt-[80px] mb-[80px]">
                  <div className="grid grid-cols-2 gap-y-24 gap-x-10 text-center text-xs font-black uppercase w-full max-w-2xl mx-auto pb-[80px] text-black">
                    <div className="flex flex-col items-center justify-end"><div className="border-t-[2px] border-black pt-2 w-full">Firma Docente</div><p className="mt-2">Profr. Aristeo Maya</p></div>
                    <div className="flex flex-col items-center justify-end"><div className="border-t-[2px] border-black pt-2 w-full">Vo. Bo. Dirección</div><p className="mt-2">Profa. Rosa M. Reynoso</p></div>
                    <div className="col-span-2 flex flex-col items-center justify-end mt-6"><div className="border-t-[2px] border-black pt-2 w-1/2 mb-8">Firma Padre/Tutor</div><span className="text-[10px] border-b-2 border-slate-300 px-16 pb-1">Nombre y firma</span></div>
                  </div>
                </div>
              </div>
            )}
          </main>
        )}
      </div>

      {vista !== 'formal' && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/95 backdrop-blur-xl border-t-[4px] border-sky-100 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] z-30 print:hidden w-full">
          <div className="w-full px-4 md:px-8 max-w-[1400px] mx-auto flex items-center justify-between gap-5">
            <div className="hidden lg:flex flex-col">
              <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Nube Inteligente</span>
              <span className={`text-sm font-black flex items-center gap-2 ${estadoSync === 'error' ? 'text-rose-500' : 'text-[#4f46e5]'}`}>
                <span className={`w-2 h-2 rounded-full ${estadoSync === 'error' ? 'bg-rose-500' : 'bg-[#4f46e5] animate-pulse'}`}></span>
                {estadoSync === 'error' ? 'Revisa tu URL / Implementación' : 'Sistema Preparado'}
              </span>
            </div>
            
            <div className="flex w-full lg:w-auto gap-3">
              <button 
                onClick={handleSincronizarNube} disabled={sincronizando}
                className={`flex-1 lg:flex-initial py-3.5 px-6 rounded-[20px] font-black flex items-center justify-center gap-2 transition-all text-sm tracking-wide ${sincronizando ? 'bg-sky-50 text-sky-400' : estadoSync === 'ok' ? 'bg-[#059669] text-white' : 'bg-white text-[#4f46e5] border-[3px] border-[#4f46e5] hover:bg-sky-50'}`}
              >
                {sincronizando ? <RefreshCw className="w-5 h-5 animate-spin" /> : estadoSync === 'ok' ? <CheckCircle2 className="w-5 h-5" /> : <CloudDownload className="w-5 h-5" />}
                <span className="hidden sm:inline">{sincronizando ? 'Cargando...' : estadoSync === 'ok' ? '¡Lista del día Cargada!' : 'Descargar día de Nube'}</span>
              </button>

              <button 
                onClick={handleGuardarEnSheets} disabled={guardado}
                className={`bubbly-btn flex-1 lg:flex-initial py-3.5 px-8 rounded-[20px] font-black flex items-center justify-center gap-3 transition-all text-sm tracking-wide ${guardado ? 'bg-[#059669] text-white' : 'bg-[#4f46e5] text-white hover:bg-[#4338ca] shadow-[0_8px_20px_rgba(79,70,229,0.3)]'}`}
              >
                {guardado ? <><CheckCircle2 className="w-5 h-5 animate-bounce" /> ¡Subido!</> : <><Save className="w-5 h-5" /> Subir a la Nube</>}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}