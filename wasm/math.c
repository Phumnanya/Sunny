// wasm/math.c
#include <emscripten.h>

// This macro keeps the C compiler from optimizing away our function
EMSCRIPTEN_KEEPALIVE
int add(int a, int b) {
    return a + b;
}