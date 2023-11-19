import matplotlib.pyplot as plt
import numpy as np
import sympy
import sys

x = sympy.symbols('x')

expressao = sys.argv[1]

# Criação da expressão simbólica
f = sympy.sympify(expressao)

# Avaliação numérica da função no intervalo desejado
x_vals = np.linspace(-10, 10, 1000)  # Intervalo de -10 a 10 com 1000 pontos
y_vals = [f.evalf(subs={x: x_val}) for x_val in x_vals]

# Criação do gráfico
plt.figure(figsize=(8, 6))
plt.plot(x_vals, y_vals, label=f'f(x) = {expressao}')

# Adição de rótulos e título
plt.xlabel('x')
plt.ylabel('f(x)')
plt.title('Gráfico da função')

# Adição de uma grade ao gráfico
plt.grid(True)

# Adição de legenda
plt.legend()
plt.savefig(sys.argv[2])