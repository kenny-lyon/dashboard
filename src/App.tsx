import React, { useState } from 'react'
import TourismDashboard from './components/TourismDashboard'
import { TrendingUp, BarChart3, Calculator, CheckCircle, Target } from 'lucide-react'

type StageKey = 0 | 1 | 2 | 3 | 4

const STAGES: { id: StageKey; name: string; icon: React.ComponentType<{ size?: number }> }[] = [
  { id: 0, name: 'Exploración', icon: TrendingUp },
  { id: 1, name: 'Identificación', icon: BarChart3 },
  { id: 2, name: 'Estimación', icon: Calculator },
  { id: 3, name: 'Validación', icon: CheckCircle },
  { id: 4, name: 'Pronóstico', icon: Target },
]

const SUBSECTIONS: Record<StageKey, string[]> = {
  0: [
    'Descriptivo',
    'Serie temporal',
    'Descomposición',
    'Estacional',
    'Estacionariedad',
    'Outliers',
    'Outliers (Z/IQR)',
    'Componentes',
    'Distribución',
    'Rolling mean/var',
  ],
  1: [
    'ACF',
    'PACF',
    'Justificación',
    'Comparación modelos',
    'Órdenes',
    'Transformaciones',
    'ACF diferenciada',
    'PACF diferenciada',
    'SARIMA (P,D,Q,s)',
  ],
  2: ['MLE', 'Convergencia', 'Modelo estimado', 'Parámetros', 'Matriz covarianzas', 'Bondad de ajuste', 'Interpretación'],
  3: [
    'Residuales',
    'Residuales Std',
    'Residuos ACF',
    'Residuos PACF',
    'Sobre/Subajuste',
    'Comparación residuales',
    'Jarque-Bera',
    'Shapiro-Wilk',
    'Durbin-Watson',
    'Breusch-Pagan',
    'ARCH',
    'Estabilidad',
    'Resumen',
  ],
  4: [
    'Curva con IC',
    'Serie + Pronóstico',
    'Tabla',
    'Métricas',
    'Backtesting',
    'Cobertura IC',
    'Monitoreo',
    'Proyección',
    'Interpretación',
    'Recomendaciones',
    'Riesgos',
    'Conclusión',
  ],
}

export default function App() {
  const [activeStage, setActiveStage] = useState<StageKey>(0)
  const [activeSection, setActiveSection] = useState<string>(SUBSECTIONS[0][0])

  const handleStageClick = (stage: StageKey) => {
    setActiveStage(stage)
    setActiveSection(SUBSECTIONS[stage][0])
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Navbar */}
      <header className="w-full bg-indigo-700 text-white shadow-sm">
        <div className="px-4 py-3 flex items-center justify-between">
          <div>
            <div className="text-lg font-semibold">
              Análisis Series Temporales: Turismo Perú 2020–2025
            </div>
            <div className="text-sm opacity-90">
              Arribos de Turistas Internacionales
            </div>
          </div>
          <div className="text-sm font-medium opacity-90">
            Desarrollado por: [kenny leonel ccora quispe]
          </div>
        </div>
      </header>

      {/* Content area with sidebars */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-60 bg-white border-r border-gray-200 p-3">
          <h1 className="text-lg font-bold text-indigo-700 mb-3">Series de Tiempo</h1>
          <nav className="space-y-1">
            {STAGES.map((s) => {
              const Icon = s.icon
              const active = activeStage === s.id
              return (
                <button
                  key={s.id}
                  onClick={() => handleStageClick(s.id)}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm transition ${
                    active ? 'bg-indigo-600 text-white' : 'hover:bg-indigo-50 text-gray-800'
                  }`}
                >
                  <Icon size={18} />
                  <span>{s.name}</span>
                </button>
              )
            })}
          </nav>
        </aside>

        {/* Sub-sidebar */}
        <aside className="w-56 bg-gray-50 border-r border-gray-200 p-3">
          <h2 className="text-sm font-semibold text-gray-700 mb-2">Secciones</h2>
          <nav className="space-y-1">
            {SUBSECTIONS[activeStage].map((sec) => (
              <button
                key={sec}
                onClick={() => setActiveSection(sec)}
                className={`w-full text-left px-3 py-2 rounded-md text-sm transition ${
                  activeSection === sec ? 'bg-indigo-100 text-indigo-800' : 'hover:bg-gray-100'
                }`}
              >
                {sec}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-6">
          <TourismDashboard activeStage={activeStage} activeSection={activeSection} />
        </main>
      </div>
    </div>
  )
}