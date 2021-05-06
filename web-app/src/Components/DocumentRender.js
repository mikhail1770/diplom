import React from 'react';
import Doc1_1 from "./Documents/Doc1_1/Doc1_1";
import Doc1_2 from "./Documents/Doc1_2/Doc1_2.js";
import Doc1_3 from "./Documents/Doc1_3/Doc1_3.js";
import Doc2_1 from "./Documents/Doc2_1/Doc2_1.js";
import Doc2_2 from "./Documents/Doc2_2/Doc2_2.js";
import Doc2_3 from "./Documents/Doc2_3/Doc2_3.js";
import Doc2_4 from "./Documents/Doc2_4/Doc2_4.js";
import Doc2_5 from "./Documents/Doc2_5/Doc2_5.js";
import Doc2_6 from "./Documents/Doc2_6/Doc2_6.js";
import Doc2_7 from "./Documents/Doc2_7/Doc2_7.js";
import Doc2_8 from "./Documents/Doc2_8/Doc2_8.js";
import Doc3_1 from "./Documents/Doc3_1/Doc3_1.js";
import Doc3_2 from "./Documents/Doc3_2/Doc3_2.js";
import Doc4_1 from "./Documents/Doc4_1/Doc4_1.js";
import Doc4_2 from "./Documents/Doc4_2/Doc4_2.js";

class DocumentRender extends React.Component {
    constructor(props) {
        super(props);
        this.documents = {
            1: Doc1_1,
            2: Doc1_2,
            3: Doc1_3,
            4: Doc2_1,
            5: Doc2_2,
            6: Doc2_3,
            7: Doc2_4,
            8: Doc2_5,
            9: Doc2_6,
            10: Doc2_7,
            11: Doc2_8,
            12: Doc3_1,
            13: Doc3_2,
            14: Doc4_1,
            15: Doc4_2
        }

    }
        render() {
            const TagName = this.documents[this.props.match.params.documentId]
            return <TagName />;
        }

}
export default DocumentRender;