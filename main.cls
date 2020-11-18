\NeedsTeXFormat{LaTeX2e}
\ProvidesClass{resume}

\LoadClass{article}

\RequirePackage[
    a4paper,
    top    = 0.75in,
    bottom = 0.75in,
    left   = 0.75in,
    right  = 0.75in
]{geometry}

\RequirePackage{hyperref}
\hypersetup{
    pdfborder = {0 0 0}
}

\setcounter{secnumdepth}{0}

\RequirePackage{setspace}

\RequirePackage{tabularx}

\RequirePackage{enumitem}

% Options --------------------

\input{glyphtounicode}
\pdfgentounicode=1

\DeclareOption{draft}{\overfullrule=5pt}
\ProcessOptions\relax

\pagenumbering{gobble}

% Commands --------------------

\newcommand\h[1]{
    {
        \vspace{-0.5in}
        \begin{center}
        \section{\uppercase{\large{#1}}}
        \end{center}
    }
}

\newcommand\hh[1]{
    {
        \vspace{6pt}
        \begin{center}
        \section{\uppercase{\normalsize{#1}}}
        \end{center}
        \vspace{6pt}
    }
}

\newcommand\details[2]{
    \begin{minipage}{0.7\textwidth}
    \begin{flushleft}
#1
    \end{flushleft}
    \end{minipage}
    \hfill
        \begin{minipage}{0.25\textwidth}
    \begin{flushright}
#2
    \end{flushright}
    \end{minipage}
}

\newenvironment{centered}
{
    \vspace{-0.5pt}
    \begin{center}
}
{
    \end{center}
}

\renewcommand{\arraystretch}{1.5}
