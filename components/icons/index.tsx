import React, { FC } from 'react';

const Icons: FC = () => (
  <svg
    aria-hidden="true"
    style={{
      position: 'absolute', width: 0, height: 0, overflow: 'hidden',
    }}
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <symbol id="icon-search" viewBox="0 0 24 24">
        <path d="M16.041 15.856c-0.034 0.026-0.067 0.055-0.099 0.087s-0.060 0.064-0.087 0.099c-1.258 1.213-2.969 1.958-4.855 1.958-1.933 0-3.682-0.782-4.95-2.050s-2.050-3.017-2.050-4.95 0.782-3.682 2.050-4.95 3.017-2.050 4.95-2.050 3.682 0.782 4.95 2.050 2.050 3.017 2.050 4.95c0 1.886-0.745 3.597-1.959 4.856zM21.707 20.293l-3.675-3.675c1.231-1.54 1.968-3.493 1.968-5.618 0-2.485-1.008-4.736-2.636-6.364s-3.879-2.636-6.364-2.636-4.736 1.008-6.364 2.636-2.636 3.879-2.636 6.364 1.008 4.736 2.636 6.364 3.879 2.636 6.364 2.636c2.125 0 4.078-0.737 5.618-1.968l3.675 3.675c0.391 0.391 1.024 0.391 1.414 0s0.391-1.024 0-1.414z" />
      </symbol>
      <symbol id="icon-profile" viewBox="0 0 28 32">
        <path d="M13.66 0c-5.007 0-9.067 4.077-9.067 9.105s4.059 9.105 9.067 9.105c5.007 0 9.067-4.077 9.067-9.105s-4.059-9.105-9.067-9.105zM13.66 2.471c3.649 0 6.606 2.97 6.606 6.635s-2.958 6.635-6.606 6.635c-3.649 0-6.606-2.97-6.606-6.635s2.958-6.635 6.606-6.635zM9.95 19.748c-1.327 0.092-2.669 0.282-3.992 0.565-2.554 0.526-4.598 1.577-5.467 3.324-0.328 0.683-0.493 1.415-0.49 2.155-0.001 0.735 0.163 1.468 0.479 2.138 0.835 1.727 2.64 2.704 5.078 3.246l0.437 0.091c1.287 0.291 2.629 0.486 3.98 0.578 0.115 0.034 0.389 0.065 0.689 0.080l0.246 0.009c0.127 0.003 0.27 0.004 0.484 0.004 1.942 0.107 3.955 0.076 5.959-0.095 1.068-0.073 2.143-0.213 3.209-0.417l0.797-0.166c2.633-0.519 4.604-1.507 5.467-3.328 0.64-1.352 0.64-2.921 0-4.273-0.861-1.817-2.807-2.796-5.487-3.348-1.052-0.225-2.12-0.391-3.196-0.497l-0.787-0.067c-2.464-0.217-4.942-0.217-7.406 0zM17.141 22.209l0.022 0.002c1.235 0.087 2.462 0.26 3.673 0.519 1.991 0.41 3.342 1.090 3.769 1.991 0.322 0.68 0.322 1.469-0 2.15-0.399 0.842-1.613 1.493-3.366 1.89l-0.384 0.081c-1.235 0.276-2.458 0.453-3.69 0.538-1.911 0.163-3.81 0.192-5.705 0.089l-0.672-0.012c-0.186-0.010-0.344-0.028-0.489-0.057-1.153-0.087-2.191-0.225-3.199-0.425l-0.602-0.127c-1.997-0.391-3.36-1.074-3.802-1.988-0.155-0.328-0.237-0.697-0.237-1.072-0.001-0.372 0.080-0.734 0.238-1.063 0.43-0.863 1.874-1.606 3.763-1.995 1.22-0.261 2.447-0.435 3.681-0.521 2.343-0.207 4.678-0.207 6.998-0.002z" />
      </symbol>
      <symbol id="icon-hide" viewBox="0 0 32 32">
        <path d="M29.2 11.199l-16.4 16.4c1 0.2 2.2 0.4 3.2 0.4 7.2 0 12.8-6.2 15.2-9.8 1-1.4 1-3.2 0-4.6-0.4-0.6-1.2-1.4-2-2.4z" />
        <path d="M28.6 0.6l-5.4 5.4c-2.2-1.2-4.6-2-7.2-2-7.2 0-12.8 6.2-15.2 9.8-1 1.4-1 3.2 0 4.4 1 1.6 2.8 3.6 4.8 5.4l-5 5c-0.8 0.8-0.8 2 0 2.8 0.4 0.4 0.8 0.6 1.4 0.6s1-0.2 1.4-0.6l28-28c0.8-0.8 0.8-2 0-2.8s-2-0.8-2.8 0zM10.6 18.6c-0.4-0.8-0.6-1.6-0.6-2.6 0-3.4 2.6-6 6-6 1 0 1.8 0.2 2.6 0.6l-8 8z" />
      </symbol>
      <symbol id="icon-opacity" viewBox="0 0 32 32">
        <path d="M2.133 0h8.533v10.667h-10.667v-8.533c0-0.566 0.225-1.108 0.625-1.508s0.943-0.625 1.508-0.625v0z" />
        <path d="M21.333 10.665h-10.667v10.667h10.667v-10.667z" />
        <path d="M21.334 0h8.533c0.566 0 1.109 0.225 1.509 0.625s0.625 0.943 0.625 1.508v8.533h-10.667v-10.667z" />
        <path d="M0 21.335h10.667v10.667h-8.533c-0.566 0-1.108-0.225-1.508-0.625s-0.625-0.943-0.625-1.509v-8.533z" />
        <path d="M21.334 21.335h10.667v8.533c0 0.566-0.225 1.108-0.625 1.509s-0.943 0.625-1.509 0.625h-8.533v-10.667z" />
      </symbol>
      <symbol id="icon-view" viewBox="0 0 43 32">
        <path d="M21.267 32c9.6 0 17.067-8.267 20.267-13.067 1.333-1.867 1.333-4.267 0-6.133-3.2-4.533-10.667-12.8-20.267-12.8s-17.067 8.267-20.267 13.067c-1.333 1.867-1.333 4.267 0 5.867 3.2 4.8 10.667 13.067 20.267 13.067zM21.267 8c4.533 0 8 3.467 8 8s-3.467 8-8 8c-4.533 0-8-3.467-8-8s3.467-8 8-8z" />
      </symbol>
      <symbol id="icon-checkmark" viewBox="0 0 32 32">
        <path d="M27 4l-15 15-7-7-5 5 12 12 20-20z" />
      </symbol>
      <symbol id="icon-logout" viewBox="0 0 32 32">
        <path d="M13.333 27.733h-5.333c-1.333 0-2.533-0.533-3.6-1.467s-1.467-2.267-1.467-3.6v-13.333c0-1.333 0.533-2.533 1.467-3.6 1.067-0.933 2.267-1.467 3.6-1.467h5.333c1.333 0 2.533 0.533 3.6 1.467 0.933 1.067 1.467 2.267 1.467 3.6v1.333c0 0.533-0.4 1.067-1.067 1.067s-1.067-0.533-1.067-1.067v-1.333c0-0.8-0.267-1.6-0.933-2.133-0.533-0.533-1.333-0.933-2.133-0.933h-5.2c-0.8 0.133-1.6 0.4-2.133 0.933s-0.8 1.333-0.8 2.133v13.333c0 0.8 0.267 1.6 0.933 2.133 0.533 0.533 1.333 0.933 2.133 0.933h5.333c0.8 0 1.6-0.267 2.133-0.933 0.533-0.533 0.933-1.333 0.933-2.133v-1.333c0-0.533 0.4-1.067 1.067-1.067s1.067 0.4 1.067 1.067v1.333c0 1.333-0.533 2.533-1.467 3.6-1.333 0.933-2.533 1.467-3.867 1.467zM22.667 22.4c-0.267 0-0.533-0.133-0.667-0.267s-0.267-0.4-0.267-0.667 0.133-0.533 0.267-0.667l3.6-3.6h-16.267c-0.533 0-1.067-0.4-1.067-1.067s0.4-1.067 1.067-1.067h16.267l-3.6-3.6c-0.133-0.133-0.267-0.4-0.267-0.667s0.133-0.533 0.267-0.667c0.4-0.4 1.067-0.4 1.467 0l5.333 5.333c0.133 0.133 0.133 0.267 0.267 0.267 0 0.133 0.133 0.267 0.133 0.4s0 0.267-0.133 0.4c0 0.133-0.133 0.267-0.267 0.267l-5.333 5.333c-0.267 0.133-0.533 0.267-0.8 0.267z" />
      </symbol>
      <symbol id="icon-close" viewBox="0 0 32 32">
        <path d="M27.467 31.2l-11.467-11.467-11.467 11.467-3.733-3.733 11.467-11.467-11.467-11.467 3.733-3.733 11.467 11.467 11.467-11.467 3.733 3.733-11.467 11.467 11.467 11.467z" />
      </symbol>
      <symbol id="icon-columns" viewBox="0 0 32 32">
        <path d="M32 32h-32v-32h32v32zM24.8 28.8h4v-25.6h-4v25.6zM17.6 28.8h4v-25.6h-4v25.6zM10.4 28.8h4v-25.6h-4v25.6zM3.2 28.8h4v-25.6h-4v25.6z" />
      </symbol>
      <symbol id="icon-triangle_border" viewBox="0 0 32 32">
        <path d="M16.291 24.727l-15.418-15.418 4.073-4.073 11.345 11.345 11.345-11.345 4.073 4.073z" />
      </symbol>
      <symbol id="icon-filled_triangle" viewBox="0 0 32 32">
        <path d="M32 3.556l-16.12 24-15.88-24h32z" />
      </symbol>
      <symbol id="icon-arrow" viewBox="0 0 32 32">
        <path d="M0 15.068c0-0.53 0.211-1.039 0.586-1.414s0.884-0.586 1.414-0.586h23.169l-8.587-8.583c-0.375-0.375-0.586-0.885-0.586-1.416s0.211-1.040 0.586-1.416c0.375-0.375 0.885-0.586 1.416-0.586s1.040 0.211 1.416 0.586l11.999 11.999c0.186 0.186 0.334 0.406 0.435 0.649s0.153 0.503 0.153 0.766-0.052 0.524-0.153 0.766c-0.101 0.243-0.249 0.464-0.435 0.649l-11.999 11.999c-0.375 0.375-0.885 0.586-1.416 0.586s-1.040-0.211-1.416-0.586c-0.375-0.375-0.586-0.885-0.586-1.416s0.211-1.040 0.586-1.416l8.587-8.583h-23.169c-0.53 0-1.039-0.211-1.414-0.586s-0.586-0.884-0.586-1.414z" />
      </symbol>
      <symbol id="icon-bar" viewBox="0 0 32 32">
        <path d="M0 15.073h8.421v15.158h-8.421v-15.158z" />
        <path d="M11.791 1.6h8.421v28.632h-8.421v-28.632z" />
        <path d="M23.578 18.442h8.421v11.789h-8.421v-11.789z" />
      </symbol>
      <symbol id="icon-calendar" viewBox="0 0 32 32">
        <path d="M9.334 14.666h2.667v2.667h-2.667v-2.667zM9.334 20h2.667v2.667h-2.667v-2.667zM14.667 14.666h2.667v2.667h-2.667v-2.667zM14.667 20h2.667v2.667h-2.667v-2.667zM20 14.666h2.667v2.667h-2.667v-2.667zM20 20h2.667v2.667h-2.667v-2.667z" />
        <path d="M6.667 29.333h18.667c1.471 0 2.667-1.196 2.667-2.667v-18.667c0-1.471-1.196-2.667-2.667-2.667h-2.667v-2.667h-2.667v2.667h-8v-2.667h-2.667v2.667h-2.667c-1.471 0-2.667 1.196-2.667 2.667v18.667c0 1.471 1.196 2.667 2.667 2.667zM25.333 10.666l0.001 16h-18.668v-16h18.667z" />
      </symbol>
      <symbol id="icon-check" viewBox="0 0 32 32">
        <path d="M32 16c0 4.243-1.686 8.313-4.686 11.314s-7.070 4.686-11.314 4.686c-4.243 0-8.313-1.686-11.314-4.686s-4.686-7.070-4.686-11.314c0-4.243 1.686-8.313 4.686-11.314s7.070-4.686 11.314-4.686c4.243 0 8.313 1.686 11.314 4.686s4.686 7.070 4.686 11.314v0zM24.060 9.94c-0.143-0.142-0.313-0.254-0.5-0.33s-0.388-0.112-0.589-0.108c-0.202 0.004-0.4 0.049-0.584 0.132s-0.349 0.202-0.486 0.35l-6.946 8.85-4.186-4.188c-0.284-0.265-0.66-0.409-1.049-0.402s-0.759 0.164-1.034 0.439c-0.275 0.275-0.432 0.646-0.439 1.034s0.137 0.765 0.402 1.049l5.292 5.294c0.143 0.142 0.312 0.254 0.499 0.33s0.387 0.112 0.588 0.108c0.201-0.004 0.4-0.048 0.584-0.13s0.349-0.201 0.487-0.348l7.984-9.98c0.272-0.283 0.423-0.661 0.419-1.054s-0.161-0.768-0.439-1.046h-0.002z" />
      </symbol>
      <symbol id="icon-data" viewBox="0 0 32 32">
        <path d="M26.667 8c0-2.891-4.884-5.333-10.667-5.333s-10.667 2.443-10.667 5.333v2.667c0 2.891 4.884 5.333 10.667 5.333s10.667-2.443 10.667-5.333v-2.667zM16 25.333c-5.783 0-10.667-2.443-10.667-5.333v4c0 2.891 4.884 5.333 10.667 5.333s10.667-2.443 10.667-5.333v-4c0 2.891-4.884 5.333-10.667 5.333z" />
        <path d="M26.667 13.334c0 2.891-4.884 5.333-10.667 5.333s-10.667-2.443-10.667-5.333v4c0 2.891 4.884 5.333 10.667 5.333s10.667-2.443 10.667-5.333v-4z" />
      </symbol>
      <symbol id="icon-download" viewBox="0 0 32 32">
        <path d="M26.667 11.81h-6.095v-9.143h-9.143v9.143h-6.095l10.667 10.667 10.667-10.667zM5.333 25.524v3.048h21.333v-3.048h-21.333z" />
      </symbol>
      <symbol id="icon-filter" viewBox="0 0 32 32">
        <path d="M9.478 28.25c0 0.708 0.568 1.28 1.272 1.28h10.496c0.704 0 1.272-0.572 1.272-1.28v-7.84h-13.041v7.84zM30.723 0.889h-29.449c-0.98 0-1.592 1.068-1.1 1.92l8.852 15.041h13.953l8.852-15.041c0.484-0.852-0.128-1.92-1.108-1.92v0z" />
      </symbol>
      <symbol id="icon-info" viewBox="0 0 32 32">
        <path d="M15.362 0c-8.485 0-15.362 6.877-15.362 15.36-0 2.017 0.397 4.015 1.169 5.879s1.903 3.557 3.33 4.984c1.426 1.427 3.12 2.558 4.984 3.33s3.861 1.169 5.879 1.169c8.482 0 15.36-6.877 15.36-15.362 0-8.483-6.878-15.36-15.36-15.36v0zM16.795 5.546c1.498 0 1.938 0.869 1.938 1.862 0 1.24-0.992 2.387-2.686 2.387-1.418 0-2.093-0.712-2.051-1.891 0-0.994 0.83-2.358 2.8-2.358v0zM12.958 24.56c-1.024 0-1.771-0.622-1.056-3.35l1.173-4.84c0.203-0.774 0.237-1.085 0-1.085-0.306 0-1.635 0.534-2.419 1.062l-0.51-0.837c2.488-2.078 5.349-3.298 6.573-3.298 1.024 0 1.194 1.21 0.683 3.072l-1.344 5.088c-0.238 0.899-0.136 1.21 0.102 1.21 0.307 0 1.312-0.371 2.301-1.15l0.579 0.778c-2.421 2.419-5.059 3.35-6.082 3.35z" />
      </symbol>
      <symbol id="icon-language" viewBox="0 0 32 32">
        <path d="M5.669 13.333c-0.224 0.871-0.337 1.767-0.336 2.667 0 0.92 0.117 1.813 0.336 2.667h3.797c-0.18-1.773-0.18-3.56 0-5.333h-3.797zM6.76 10.667h3.128c0.355-1.623 0.867-3.076 1.495-4.285-1.936 0.933-3.546 2.426-4.623 4.285v0zM26.331 13.333h-3.797c0.18 1.773 0.18 3.56 0 5.333h3.797c0.449-1.749 0.449-3.584 0-5.333v0zM25.24 10.667c-1.076-1.86-2.687-3.353-4.623-4.285 0.629 1.209 1.14 2.663 1.495 4.285h3.128zM12.149 13.333c-0.1 0.885-0.15 1.776-0.149 2.667 0 0.913 0.051 1.807 0.149 2.667h7.701c0.201-1.772 0.201-3.561 0-5.333h-7.701zM12.627 10.667h6.747c-0.243-1.002-0.593-1.975-1.044-2.903-0.837-1.673-1.733-2.431-2.329-2.431-0.597 0-1.492 0.757-2.329 2.431-0.42 0.843-0.773 1.823-1.044 2.903zM6.76 21.333c1.076 1.86 2.687 3.353 4.623 4.285-0.629-1.209-1.14-2.663-1.495-4.285h-3.128zM25.24 21.333h-3.128c-0.355 1.623-0.867 3.076-1.495 4.285 1.936-0.933 3.546-2.426 4.623-4.285zM12.627 21.333c0.271 1.080 0.624 2.060 1.044 2.903 0.837 1.673 1.733 2.431 2.329 2.431 0.597 0 1.492-0.757 2.329-2.431 0.42-0.843 0.773-1.823 1.044-2.903h-6.747zM16 29.333c-7.364 0-13.333-5.969-13.333-13.333s5.969-13.333 13.333-13.333c7.364 0 13.333 5.969 13.333 13.333s-5.969 13.333-13.333 13.333z" />
      </symbol>
      <symbol id="icon-line" viewBox="0 0 32 32">
        <path d="M1.053 17.419l2.077 0.515 1.563-2.455-2.971-0.734c-0.355-0.089-0.73-0.033-1.043 0.155s-0.539 0.493-0.628 0.848c-0.089 0.355-0.033 0.73 0.155 1.043s0.493 0.539 0.848 0.628v0zM28.163 17.817l-6.801 6.12-7.995-6.188c-0.153-0.117-0.328-0.201-0.515-0.247l-1.064-0.265-1.565 2.455 1.676 0.416 8.681 6.717c0.258 0.198 0.577 0.3 0.902 0.288s0.636-0.137 0.878-0.354l7.662-6.898c0.135-0.121 0.245-0.267 0.323-0.431s0.123-0.341 0.132-0.522c0.009-0.181-0.018-0.362-0.079-0.532s-0.156-0.327-0.278-0.461c-0.247-0.271-0.592-0.434-0.958-0.452s-0.726 0.109-0.998 0.355v0zM13.235 11.094l7.447 4.768c0.302 0.193 0.668 0.262 1.020 0.192s0.664-0.273 0.869-0.567l7.66-11.035c0.104-0.149 0.177-0.317 0.215-0.494s0.041-0.361 0.009-0.539c-0.033-0.179-0.1-0.349-0.199-0.501s-0.227-0.283-0.377-0.386c-0.302-0.209-0.675-0.289-1.036-0.223s-0.682 0.272-0.891 0.574l-6.9 9.937-7.491-4.795c-0.311-0.199-0.688-0.266-1.048-0.187-0.359 0.080-0.672 0.299-0.87 0.61l-11.424 17.931c-0.134 0.209-0.209 0.45-0.217 0.697s0.050 0.493 0.17 0.71 0.296 0.398 0.509 0.523c0.214 0.125 0.458 0.191 0.705 0.189 0.233 0.001 0.463-0.058 0.667-0.17s0.378-0.274 0.503-0.47l10.679-16.762z" />
      </symbol>
      <symbol id="icon-mail" viewBox="0 0 32 32">
        <path d="M0 10.768v13.232c0 1.414 0.562 2.771 1.562 3.771s2.357 1.562 3.771 1.562h21.333c1.414 0 2.771-0.562 3.771-1.562s1.562-2.357 1.562-3.771v-16c0-1.415-0.562-2.771-1.562-3.771s-2.357-1.562-3.771-1.562h-21.333c-1.415 0-2.771 0.562-3.771 1.562s-1.562 2.357-1.562 3.771v2.768zM5.333 5.333h21.333c0.707 0 1.386 0.281 1.886 0.781s0.781 1.178 0.781 1.886v1.973l-13.333 7.179-13.333-7.179v-1.973c0-0.707 0.281-1.386 0.781-1.886s1.178-0.781 1.886-0.781v0zM2.667 13.003l12.701 6.837c0.194 0.105 0.411 0.159 0.632 0.159s0.438-0.055 0.632-0.159l12.701-6.837v10.997c0 0.707-0.281 1.386-0.781 1.886s-1.178 0.781-1.886 0.781h-21.333c-0.707 0-1.386-0.281-1.886-0.781s-0.781-1.178-0.781-1.886v-10.997z" />
      </symbol>
      <symbol id="icon-map" viewBox="0 0 32 32">
        <path d="M11.2 7.2l-11.2-5.6v21.178l11.2 5.6 9.6-4.8 11.2 5.6v-21.178l-11.2-5.6-9.6 4.8zM20.8 20.189l-9.6 4.8v-14.4l9.6-4.8v14.4z" />
      </symbol>
      <symbol id="icon-password" viewBox="0 0 32 32">
        <path d="M24.635 10.667h3.048c0.404 0 0.792 0.161 1.078 0.446s0.446 0.673 0.446 1.078v18.286c0 0.404-0.161 0.792-0.446 1.077s-0.673 0.446-1.078 0.446h-24.381c-0.404 0-0.792-0.161-1.077-0.446s-0.446-0.673-0.446-1.077v-18.286c0-0.404 0.161-0.792 0.446-1.078s0.673-0.446 1.077-0.446h3.048v-1.524c0-2.425 0.963-4.75 2.678-6.465s4.040-2.678 6.465-2.678c2.425 0 4.75 0.963 6.465 2.678s2.678 4.040 2.678 6.465v1.524zM4.825 13.714v15.238h21.333v-15.238h-21.333zM13.968 19.81h3.048v3.047h-3.048v-3.047zM7.873 19.81h3.048v3.047h-3.048v-3.047zM20.063 19.81h3.048v3.047h-3.048v-3.047zM21.587 10.667v-1.524c0-1.617-0.642-3.167-1.785-4.31s-2.694-1.785-4.31-1.785-3.167 0.642-4.31 1.785c-1.143 1.143-1.785 2.693-1.785 4.31v1.524h12.191z" />
      </symbol>
      <symbol id="icon-pie" viewBox="0 0 32 32">
        <path d="M14.555 17.053l2.197-14.373c-0.727-0.114-1.46-0.175-2.196-0.183-8.041 0-14.557 6.517-14.557 14.555 0 8.040 6.517 14.555 14.555 14.555s14.555-6.517 14.555-14.555c0-0.341-0.027-0.676-0.051-1.013l-14.505 1.013zM19.694 0l-2.197 14.373 14.503-1.013c-0.231-3.293-1.575-6.409-3.811-8.837s-5.232-4.023-8.495-4.522v0z" />
      </symbol>
      <symbol id="icon-checkmark" viewBox="0 0 32 32">
        <path d="M27 4l-15 15-7-7-5 5 12 12 20-20z" />
      </symbol>
    </defs>
  </svg>
);

export default Icons;
