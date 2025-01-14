describe('inlinePanel', () => {
  let inlinePanel;

  beforeAll(() => {
    inlinePanel = require('./inlinePanel').inlinePanel;

    document.body.innerHTML = `
<form>
    <input name="person_cafe_relationship-TOTAL_FORMS" value="0" id="id_person_cafe_relationship-TOTAL_FORMS" type="hidden" />
    <input name="person_cafe_relationship-INITIAL_FORMS" value="0" id="id_person_cafe_relationship-INITIAL_FORMS" type="hidden" />
    <input name="person_cafe_relationship-MIN_NUM_FORMS" value="1" id="id_person_cafe_relationship-MIN_NUM_FORMS" type="hidden" />
    <input name="person_cafe_relationship-MAX_NUM_FORMS" value="5" id="id_person_cafe_relationship-MAX_NUM_FORMS" type="hidden" />
    <div id="id_person_cafe_relationship-FORMS"></div>
    <script type="text/django-form-template" id="id_person_cafe_relationship-EMPTY_FORM_TEMPLATE">
        <p id="person_cafe_relationship-__prefix__">form for inline child</p>
    </script>
    <button type="button" id="id_person_cafe_relationship-ADD">Add item</button>
</form>`;
  });

  const onAdd = jest.fn();

  it('should allow inserting a new form and calling an onAdd function', () => {
    const options = {
      formsetPrefix: 'id_person_cafe_relationship',
      emptyChildFormPrefix: 'person_cafe_relationship-__prefix__',
      onAdd: onAdd,
    };

    inlinePanel(options);

    expect(onAdd).not.toHaveBeenCalled();

    // click the 'add' button
    document.getElementById('id_person_cafe_relationship-ADD').click();
    expect(onAdd).toHaveBeenCalled();
    expect(document.body.innerHTML).toMatchSnapshot();
  });
});
