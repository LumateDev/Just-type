import React from 'react'
import "./keyboard.css"

import { ReactComponent as SvgA } from './../../img/keyboard/key-a.svg';
import { ReactComponent as SvgB } from './../../img/keyboard/key-b.svg';
import { ReactComponent as SvgC } from './../../img/keyboard/key-c.svg';
import { ReactComponent as SvgD } from './../../img/keyboard/key-d.svg';
import { ReactComponent as SvgE } from './../../img/keyboard/key-e.svg';
import { ReactComponent as SvgF } from './../../img/keyboard/key-f.svg';
import { ReactComponent as SvgG } from './../../img/keyboard/key-g.svg';
import { ReactComponent as SvgH } from './../../img/keyboard/key-h.svg';
import { ReactComponent as SvgI } from './../../img/keyboard/key-i.svg';
import { ReactComponent as SvgJ } from './../../img/keyboard/key-j.svg';
import { ReactComponent as SvgK } from './../../img/keyboard/key-k.svg';
import { ReactComponent as SvgL } from './../../img/keyboard/key-l.svg';
import { ReactComponent as SvgM } from './../../img/keyboard/key-m.svg';
import { ReactComponent as SvgN } from './../../img/keyboard/key-n.svg';
import { ReactComponent as SvgO } from './../../img/keyboard/key-o.svg';
import { ReactComponent as SvgP } from './../../img/keyboard/key-p.svg';
import { ReactComponent as SvgQ } from './../../img/keyboard/key-q.svg';
import { ReactComponent as SvgR } from './../../img/keyboard/key-r.svg';
import { ReactComponent as SvgS } from './../../img/keyboard/key-s.svg';
import { ReactComponent as SvgT } from './../../img/keyboard/key-t.svg';
import { ReactComponent as SvgU } from './../../img/keyboard/key-u.svg';
import { ReactComponent as SvgV } from './../../img/keyboard/key-v.svg';
import { ReactComponent as SvgW } from './../../img/keyboard/key-w.svg';
import { ReactComponent as SvgX } from './../../img/keyboard/key-x.svg';
import { ReactComponent as SvgY } from './../../img/keyboard/key-y.svg';
import { ReactComponent as SvgZ } from './../../img/keyboard/key-z.svg';
import { ReactComponent as SvgOpenBracket } from './../../img/keyboard/key-open-bracket.svg';
import { ReactComponent as SvgCloseBracket } from './../../img/keyboard/key-close-bracket.svg';
import { ReactComponent as SvgSemicolon } from './../../img/keyboard/key-semicolon.svg';
import { ReactComponent as SvgDoubleQuote } from './../../img/keyboard/key-double-quote.svg';
import { ReactComponent as SvgComma } from './../../img/keyboard/key-,.svg';
import { ReactComponent as SvgPoint } from './../../img/keyboard/key-..svg';
import { ReactComponent as SvgSlash } from './../../img/keyboard/key-slash.svg';
import { ReactComponent as SvgSpace } from './../../img/keyboard/key-space.svg';





const Keyboard = ({activeKey}) => {


  const getKeyStyle = (key) => {
    if (key.toLowerCase() === activeKey.toLowerCase()) {
      console.log("Кнопка должна получить класс active");
      return "activeKey";   
    }
    return "defaultKey";
};



  return (
    <section className="keyboard">
      <div className="container">
        <div className="keyboard-wrapper">
          <div className="row row1">
          <SvgQ width={50} className={getKeyStyle("q")} />
          <SvgW width={50} className={getKeyStyle("w")} />
          <SvgE width={50} className={getKeyStyle("e")} />
          <SvgR width={50} className={getKeyStyle("r")} />
          <SvgT width={50} className={getKeyStyle("t")} />
          <SvgY width={50} className={getKeyStyle("y")} />
          <SvgU width={50} className={getKeyStyle("u")} />
          <SvgI width={50} className={getKeyStyle("i")} />
          <SvgO width={50} className={getKeyStyle("o")} />
          <SvgP width={50} className={getKeyStyle("p")} />
          <SvgOpenBracket width={50} className={getKeyStyle("[")} />
          <SvgCloseBracket width={50} className={getKeyStyle("]")} />
          </div>

          <div className="row row2">
          <SvgA width={50} className={getKeyStyle("a")} />
          <SvgS width={50} className={getKeyStyle("s")} />
          <SvgD width={50} className={getKeyStyle("d")} />
          <SvgF width={50} className={getKeyStyle("f")} />
          <SvgG width={50} className={getKeyStyle("g")} />
          <SvgH width={50} className={getKeyStyle("h")} />
          <SvgJ width={50} className={getKeyStyle("j")} />
          <SvgK width={50} className={getKeyStyle("k")} />
          <SvgL width={50} className={getKeyStyle("l")} />
          <SvgSemicolon width={50} className={getKeyStyle(";")} />
          <SvgDoubleQuote width={50} className={getKeyStyle('"')} />
          </div>

          <div className="row row3">
          <SvgZ width={50} className={getKeyStyle("z")} />
          <SvgX width={50} className={getKeyStyle("x")} />
          <SvgC width={50} className={getKeyStyle("c")} />
          <SvgV width={50} className={getKeyStyle("v")} />
          <SvgB width={50} className={getKeyStyle("b")} />
          <SvgN width={50} className={getKeyStyle("n")} />
          <SvgM width={50} className={getKeyStyle("m")} />
          <SvgComma width={50} className={getKeyStyle(",")} />
          <SvgPoint width={50} className={getKeyStyle(".")} />
          <SvgSlash width={50} className={getKeyStyle("/")} />
          </div>

          <div className="row row4">
          <SvgSpace  height={65} className={getKeyStyle(" ")} />
          </div>

        </div>
      </div>
    </section>
  );
};

export default Keyboard;