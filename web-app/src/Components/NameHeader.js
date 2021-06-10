import React from 'react';


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
        return <TagName/>;
    }

}
export default DocumentRender;