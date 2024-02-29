import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import { RichText, InspectorControls, BlockControls, AlignmentToolbar } from '@wordpress/block-editor';
import { ColorPalette, PanelBody } from '@wordpress/components';

const ContentToggleBlock = ({ attributes, setAttributes }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [backgroundColor, setBackgroundColor] = useState(attributes.backgroundColor || '#fff');
    const [textColor, setTextColor] = useState(attributes.textColor || '#000');
    const [contentAlignment, setContentAlignment] = useState(attributes.contentAlignment || 'center');
    const colors = [
        { name: 'red', color: '#f00' },
        { name: 'white', color: '#fff' },
        { name: 'blue', color: '#00f' },
    ];

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Color Settings', 'custom-block')}>
                    <div>
                        <p>{__('Background Color', 'custom-block')}</p>
                        <ColorPalette
                            colors={colors}
                            value={backgroundColor}
                            onChange={(color) => {
                                setBackgroundColor(color);
                                setAttributes({ backgroundColor: color });
                            }}
                        />
                    </div>
                    <div>
                        <p>{__('Text Color', 'custom-block')}</p>
                        <ColorPalette
                            colors={colors}
                            value={textColor}
                            onChange={(color) => {
                                setTextColor(color);
                                setAttributes({ textColor: color });
                            }}
                        />
                    </div>
                </PanelBody>
            </InspectorControls>
            <BlockControls>
                <AlignmentToolbar
                    value={contentAlignment}
                    onChange={(newAlignment) => {
                        setContentAlignment(newAlignment);
                        setAttributes({ contentAlignment: newAlignment });
                    }}
                />
            </BlockControls>
            <div
                style={{
                    backgroundColor: backgroundColor,
                    color: textColor,
                    padding: '10px',
                    marginTop: '10px',
                    textAlign: contentAlignment,
                }}
            >
                <button onClick={toggleOpen}>
                    {isOpen ? __('Hide Content', 'textdomain') : __('Show Content', 'textdomain')}
                </button>
                {isOpen && (
                    <RichText
                        tagName="div"
                        placeholder={__('Write your content here', 'textdomain')}
                        value={attributes.content}
                        onChange={(content) => setAttributes({ content })}
                    />
                )}
            </div>
        </>
    );
};

export default ContentToggleBlock;
