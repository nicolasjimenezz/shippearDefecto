export const COMPANY_TEMPLATE = `
# TEMPLATE INTERNO DE CONTRATOS - EMPRESA

## 1. Partes del Contrato
- Identificacion completa de ambas partes (razon social, CUIT, domicilio legal)
- Representante legal con poder suficiente
- Datos de contacto oficiales

## 2. Objeto del Contrato
- Descripcion clara y especifica del servicio/producto
- Alcance detallado
- Entregables definidos

## 3. Condiciones de Pago
- Plazo maximo de pago: 30 dias desde factura
- Moneda: Pesos Argentinos (preferido) o Dolares con tipo de cambio especificado
- Metodo de pago: transferencia bancaria
- Facturacion: mensual/por hito segun corresponda
- ALERTA SI: plazo mayor a 30 dias, pagos anticipados sin garantia, o moneda extranjera sin clausula de ajuste

## 4. Penalidades
- Penalidad maxima aceptable: 10% del valor total del contrato
- Penalidades deben ser reciprocas (aplican a ambas partes)
- Periodo de gracia minimo antes de aplicar penalidades: 5 dias habiles
- ALERTA SI: penalidades superiores al 10%, penalidades unilaterales, o sin periodo de gracia

## 5. Terminacion
- Terminacion por conveniencia: ambas partes con preaviso de 30 dias
- Terminacion por incumplimiento: con periodo de cura de 15 dias
- Efectos de terminacion claros (pagos pendientes, propiedad intelectual, confidencialidad post-terminacion)
- ALERTA SI: terminacion unilateral sin causa, sin periodo de cura, o sin preaviso

## 6. Confidencialidad
- Duracion: minimo 2 anos post-terminacion
- Definicion clara de informacion confidencial
- Excepciones estandar (informacion publica, conocimiento previo, requerimiento legal)
- ALERTA SI: duracion indefinida, definicion muy amplia, o sin excepciones

## 7. Jurisdiccion y Ley Aplicable
- Preferencia: Tribunales Ordinarios de la Ciudad Autonoma de Buenos Aires
- Ley aplicable: Argentina
- ALERTA SI: jurisdiccion extranjera, arbitraje obligatorio costoso, o ley extranjera

## 8. Renovacion
- Renovacion automatica con opcion de no renovar con 60 dias de anticipacion
- Condiciones de renovacion pre-acordadas
- ALERTA SI: renovacion automatica sin opcion de salida, o incrementos de precio no especificados

## 9. Responsabilidades
- Limitacion de responsabilidad: maximo el valor anual del contrato
- Exclusion de danos indirectos, consecuenciales, lucro cesante
- Seguros requeridos segun corresponda
- ALERTA SI: responsabilidad ilimitada, inclusion de danos indirectos, o falta de seguros en servicios de riesgo

## 10. Fechas Importantes a Identificar
- Fecha de inicio de vigencia
- Fecha de finalizacion
- Plazos de entrega/hitos
- Fechas de pago
- Plazos de preaviso para terminacion/renovacion

## 11. Propiedad Intelectual
- Definir claramente la titularidad de desarrollos y entregables
- Licencias de uso especificadas
- ALERTA SI: cesion total de PI sin compensacion adecuada

## 12. Limitacion de Responsabilidad
- Cap de responsabilidad: valor total del contrato o valor anual
- Exclusiones mutuas de danos indirectos
- ALERTA SI: caps muy bajos o muy altos, responsabilidad asimetrica
`

export const ANALYSIS_PROMPT = `Eres un abogado corporativo experto analizando contratos. Tu tarea es comparar el contrato proporcionado contra el template interno de la empresa y detectar:

1. **Divergencias de riesgo**: Clausulas que difieren del template de forma que aumentan el riesgo para la empresa
2. **Clausulas faltantes**: Protecciones que deberian estar segun el template pero no estan
3. **Fechas importantes**: Extraer todas las fechas relevantes del contrato
4. **Condiciones problematicas**: Terminos que podrian causar problemas legales o financieros

TEMPLATE INTERNO DE REFERENCIA:
${COMPANY_TEMPLATE}

INSTRUCCIONES:
- Analiza cada seccion del template y compara con el contrato
- Asigna severidad HIGH a problemas que expongan significativamente a la empresa (penalidades excesivas, falta de limitacion de responsabilidad, jurisdiccion extranjera)
- Asigna severidad MEDIUM a divergencias moderadas que requieren atencion
- Asigna severidad LOW a diferencias menores o sugerencias de mejora
- El overall_risk_score debe reflejar el riesgo agregado (0=sin riesgos, 100=muy riesgoso)
- Se especifico en los extractos del contrato y template para facilitar la revision
- El resumen ejecutivo debe ser conciso y accionable

CONTRATO A ANALIZAR:
`
