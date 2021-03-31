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

      <symbol id="icon-view" viewBox="0 0 43 32">
        <path fill="#fff" d="M21.267 32c9.6 0 17.067-8.267 20.267-13.067 1.333-1.867 1.333-4.267 0-6.133-3.2-4.533-10.667-12.8-20.267-12.8s-17.067 8.267-20.267 13.067c-1.333 1.867-1.333 4.267 0 5.867 3.2 4.8 10.667 13.067 20.267 13.067zM21.267 8c4.533 0 8 3.467 8 8s-3.467 8-8 8c-4.533 0-8-3.467-8-8s3.467-8 8-8z" />
      </symbol>
      <symbol id="icon-icn_settings" viewBox="0 0 32 32">
        <path fill="none" stroke="#3a3f59" strokeLinejoin="miter" strokeLinecap="butt" strokeMiterlimit="4" strokeWidth="3.2" d="M23.2 1.6v0zM16 1.6v0zM8.8 1.6v0zM1.6 30.4h28.8v-28.8h-28.8v28.8z" />
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
